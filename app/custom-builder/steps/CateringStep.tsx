'use client';

import React, { useEffect, useState } from 'react';
import { CatalogGroup, CatalogItem, PackageDefinition, PackageGroupLimit } from '@/lib/types/catalog';
import { EventBuilderState } from '@/lib/types/event-builder';
import { getCatalogGroups, getCatalogItems, getPackageDefinition, getPackageDefinitions, getPackageGroupLimits } from '@/lib/data/catalog';
import { canAddToGroup, isGroupLocked } from '@/lib/builder/limits';
import { getEffectiveGroupLimit, getGroupSelectionCount, getLinesByGroup } from '@/lib/builder/selectors';
import { isGatedByPackage, PACKAGE_LEVEL_NAMES } from '@/lib/builder/package-levels';
import { CatalogItemCard } from '@/components/builder/CatalogItemCard';
import { ReplaceSelectionModal } from '@/components/builder/ReplaceSelectionModal';
import { ApprovalRequestModal } from '@/components/builder/ApprovalRequestModal';
import { PackageUpgradeModal } from '@/components/builder/PackageUpgradeModal';
import { LoadingState, EmptyState } from '@/components/builder/EmptyState';
import { SITE } from '@/lib/site-config';

interface CateringStepProps {
  state: EventBuilderState;
  onAddToCart: (item: CatalogItem) => void;
  onRemoveFromCart: (id: string) => void;
  onReplace: (oldId: string, item: CatalogItem) => void;
  onRequestExtraApproval: (item: CatalogItem) => void;
  onSelectPackage: (packageId: string) => void;
}

export function CateringStep({ state, onAddToCart, onRemoveFromCart, onReplace, onRequestExtraApproval, onSelectPackage }: CateringStepProps) {
  const [groups, setGroups] = useState<CatalogGroup[] | null>(null);
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [packageLimits, setPackageLimits] = useState<PackageGroupLimit[]>([]);
  const [currentPackage, setCurrentPackage] = useState<PackageDefinition | null>(null);
  const [allPackages, setAllPackages] = useState<PackageDefinition[]>([]);
  const [activeGroupId, setActiveGroupId] = useState<string>('all');

  const [pendingReplace, setPendingReplace] = useState<CatalogItem | null>(null);
  const [pendingApproval, setPendingApproval] = useState<CatalogItem | null>(null);
  const [pendingUpgrade, setPendingUpgrade] = useState<CatalogItem | null>(null);

  useEffect(() => {
    if (!state.eventTypeId) return;
    Promise.all([
      getCatalogGroups(state.eventTypeId, 'catering'),
      getCatalogItems(state.eventTypeId, 'catering'),
      getPackageDefinitions(state.eventTypeId),
      state.selectedPackageId ? getPackageGroupLimits(state.selectedPackageId) : Promise.resolve([]),
      state.selectedPackageId ? getPackageDefinition(state.selectedPackageId) : Promise.resolve(null),
    ]).then(([g, i, allPkgs, pl, pkg]) => {
      setGroups(g);
      setItems(i);
      setAllPackages(allPkgs);
      setPackageLimits(pl);
      setCurrentPackage(pkg);
    });
  }, [state.eventTypeId, state.selectedPackageId]);

  if (groups === null) {
    return <LoadingState label="Loading catering menu..." />;
  }

  if (groups.length === 0) {
    return (
      <EmptyState
        title="Catering menu not available yet"
        description="Our catering menu for this event type is still being finalized by the vendor."
      />
    );
  }

  const packageLimitByGroup = new Map(packageLimits.map((pl) => [pl.groupId, pl]));
  const visibleItems = activeGroupId === 'all' ? items : items.filter((i) => i.groupId === activeGroupId);
  const activeGroup = groups.find((g) => g.id === activeGroupId) || null;

  const handleSelect = (item: CatalogItem) => {
    if (state.cart[item.id]) {
      onRemoveFromCart(item.id);
      return;
    }

    if (isGatedByPackage(item.packageLevel, currentPackage?.packageLevel ?? null)) {
      setPendingUpgrade(item);
      return;
    }

    const group = groups.find((g) => g.id === item.groupId);
    if (!group) {
      onAddToCart(item);
      return;
    }

    const decision = canAddToGroup(state, group, packageLimitByGroup.get(group.id));
    if (decision.allowed) {
      onAddToCart(item);
    } else if (decision.reason === 'limit_reached' && decision.requiresApproval) {
      setPendingApproval(item);
    } else {
      setPendingReplace(item);
    }
  };

  const pendingReplaceGroup = pendingReplace ? groups.find((g) => g.id === pendingReplace.groupId) : null;
  const upgradeTargetPackage = pendingUpgrade ? allPackages.find((p) => p.packageLevel === pendingUpgrade.packageLevel) : null;

  return (
    <div className="space-y-6">
      <div className="border-b border-gold-300/40 pb-4">
        <h2 className="font-playfair text-2xl font-bold text-maroon-900">Step 4: Catering</h2>
        <p className="text-xs text-maroon-700/80">
          Build your menu category by category. Welcome Drinks and Starters follow package-based limits.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 pb-2">
        <button
          onClick={() => setActiveGroupId('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border ${
            activeGroupId === 'all' ? 'bg-maroon-800 text-gold-300 border-gold-400 shadow-sm' : 'bg-white text-maroon-900 border-gold-300 hover:bg-gold-50'
          }`}
        >
          All Items
        </button>
        {groups.map((group) => {
          const count = getGroupSelectionCount(state, group.id);
          const { maxSelections } = getEffectiveGroupLimit(group, packageLimitByGroup.get(group.id));
          return (
            <button
              key={group.id}
              onClick={() => setActiveGroupId(group.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border ${
                activeGroupId === group.id ? 'bg-maroon-800 text-gold-300 border-gold-400 shadow-sm' : 'bg-white text-maroon-900 border-gold-300 hover:bg-gold-50'
              }`}
            >
              {group.name}
              {maxSelections !== null && <span className="ml-1 opacity-70">({count}/{maxSelections})</span>}
            </button>
          );
        })}
      </div>

      {activeGroup && (() => {
        const { maxSelections } = getEffectiveGroupLimit(activeGroup, packageLimitByGroup.get(activeGroup.id));
        const count = getGroupSelectionCount(state, activeGroup.id);
        if (maxSelections !== null) {
          return (
            <p className="text-xs font-bold text-maroon-800 bg-gold-100 border border-gold-300 rounded-xl px-4 py-2.5">
              {count} of {maxSelections} selected for {activeGroup.name}
              {count >= maxSelections ? ' - you have reached the maximum for this category.' : ''}
            </p>
          );
        }
        return null;
      })()}

      {visibleItems.length === 0 ? (
        <EmptyState title="No menu items here yet" description="We're still adding items to this category." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {visibleItems.map((item) => {
            const isSelected = !!state.cart[item.id];
            const group = groups.find((g) => g.id === item.groupId);
            const locked = group ? isGroupLocked(state, group, packageLimitByGroup.get(group.id)) : false;
            return (
              <CatalogItemCard
                key={item.id}
                item={item}
                isSelected={isSelected}
                isLocked={locked}
                onSelect={() => handleSelect(item)}
              />
            );
          })}
        </div>
      )}

      {pendingReplace && pendingReplaceGroup && (
        <ReplaceSelectionModal
          groupName={pendingReplaceGroup.name}
          pendingItemName={pendingReplace.name}
          selectedLines={getLinesByGroup(state, pendingReplaceGroup.id)}
          onReplace={(lineIdToRemove) => {
            onReplace(lineIdToRemove, pendingReplace);
            setPendingReplace(null);
          }}
          onCancel={() => setPendingReplace(null)}
        />
      )}

      {pendingApproval && (
        <ApprovalRequestModal
          itemName={pendingApproval.name}
          message={groups.find((g) => g.id === pendingApproval.groupId)?.approvalMessage || 'This item requires vendor approval.'}
          vendorPhoneDisplay={SITE.phoneDisplay}
          vendorPhoneHref={SITE.phoneHref}
          onRequestExtra={() => {
            onRequestExtraApproval(pendingApproval);
            setPendingApproval(null);
          }}
          onCancel={() => setPendingApproval(null)}
        />
      )}

      {pendingUpgrade && (
        <PackageUpgradeModal
          itemName={pendingUpgrade.name}
          requiredLevel={pendingUpgrade.packageLevel}
          requiredLevelName={PACKAGE_LEVEL_NAMES[pendingUpgrade.packageLevel]}
          onUpgrade={() => {
            if (upgradeTargetPackage) onSelectPackage(upgradeTargetPackage.id);
            setPendingUpgrade(null);
          }}
          onAddAsPaidExtra={() => {
            onAddToCart(pendingUpgrade);
            setPendingUpgrade(null);
          }}
          onContactVendor={() => {
            window.open(SITE.phoneHref, '_blank');
            setPendingUpgrade(null);
          }}
          onCancel={() => setPendingUpgrade(null)}
        />
      )}
    </div>
  );
}
