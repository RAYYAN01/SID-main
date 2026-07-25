import { CustomBuilderState } from './types/wedding';

export function generateQuotationHTML(
  quoteId: string,
  state: CustomBuilderState,
  customerName: string = 'Valued Client'
): string {
  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <title>SID Events Package Summary #${quoteId}</title>
      <style>
        body {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          color: #0B0F19;
          background-color: #ffffff;
          padding: 40px;
          margin: 0;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 3px solid #C9A227;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .brand {
          font-size: 24px;
          font-weight: bold;
          color: #0F172B;
          letter-spacing: 1px;
        }
        .brand span {
          color: #C9A227;
        }
        .meta {
          text-align: right;
          font-size: 14px;
          color: #5C4806;
        }
        .section-title {
          font-size: 18px;
          font-weight: bold;
          color: #0F172B;
          border-bottom: 1px solid #F0DFA0;
          padding-bottom: 6px;
          margin-top: 25px;
          margin-bottom: 15px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        th, td {
          padding: 10px 12px;
          text-align: left;
          font-size: 14px;
          border-bottom: 1px solid #FFF8F0;
        }
        th {
          background-color: #0F172B;
          color: #FFF8F0;
          font-weight: 600;
        }
        tr:nth-child(even) {
          background-color: #FCF8E8;
        }
        .note-box {
          margin-top: 30px;
          background-color: #0F172B;
          color: #FFF8F0;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          border: 2px solid #C9A227;
        }
        .note-box p {
          margin: 4px 0;
          font-size: 14px;
        }
        .footer {
          margin-top: 50px;
          text-align: center;
          font-size: 12px;
          color: #5C4806;
          border-top: 1px dashed #C9A227;
          padding-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="brand">SID <span>EVENTS</span></div>
          <div style="font-size: 12px; color: #0F172B; margin-top: 4px;">Davanagere's #1 Event Company</div>
        </div>
        <div class="meta">
          <strong>Reference #:</strong> ${quoteId}<br />
          <strong>Date:</strong> ${dateStr}<br />
          <strong>Client:</strong> ${customerName}
        </div>
      </div>

      <div class="section-title">Selected Wedding Services Summary</div>
      <table>
        <thead>
          <tr>
            <th>Service Category</th>
            <th>Details & Inclusions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Mandapam & Decoration</strong></td>
            <td>${Object.keys(state.selectedServices).length} item(s) selected</td>
          </tr>
          <tr>
            <td><strong>Catering & Food</strong></td>
            <td>${state.catering.guestCount} Guests - ${state.catering.packageTier.toUpperCase()} Sadhya & Buffet (${state.catering.meals.join(', ')})</td>
          </tr>
          <tr>
            <td><strong>Photography & Film</strong></td>
            <td>${state.photography.packageTier.toUpperCase()} Photography Tier ${state.photography.includeDrone ? '+ Drone' : ''} (${state.photography.albumType} Album)</td>
          </tr>
          <tr>
            <td><strong>Bridal Makeup</strong></td>
            <td>${state.makeup.packageTier.toUpperCase()} Styling (${state.makeup.brideCount} Bride, ${state.makeup.groomCount} Groom, ${state.makeup.familyCount} Family)</td>
          </tr>
          <tr>
            <td><strong>Vedic Purohit</strong></td>
            <td>${state.purohit.language.toUpperCase()} Vedic Scholars & Samagri (${state.purohit.homaRequired ? 'Homa Included' : 'Standard'})</td>
          </tr>
          <tr>
            <td><strong>Security & Staff</strong></td>
            <td>${state.security.maleBouncers + state.security.femaleBouncers} Bouncers + ${state.security.parkingStaffCount} Parking Staff</td>
          </tr>
          <tr>
            <td><strong>Welcome Hostesses</strong></td>
            <td>${state.welcomeGirls.count} Welcome Hostesses with Floral Plates</td>
          </tr>
          <tr>
            <td><strong>Entertainment & Cultural</strong></td>
            <td>${state.dancers.style.replace('_', ' ').toUpperCase()} Troupe (${state.dancers.performerCount} Performers, ${state.dancers.durationHours} hrs)</td>
          </tr>
        </tbody>
      </table>

      <div class="note-box">
        <p><strong>No fixed pricing is shown on this summary.</strong></p>
        <p>Our team will follow up with a detailed, no-obligation quote based on your selections.</p>
      </div>

      <div class="footer">
        <p>Thank you for choosing SID Events.</p>
        <p>Contact Us: +91 80954 08404 | sideventsdvg@gmail.com</p>
      </div>
    </body>
    </html>
  `;
}

export function downloadQuotationPDF(quoteId: string, state: CustomBuilderState, customerName?: string) {
  const htmlContent = generateQuotationHTML(quoteId, state, customerName);
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  }
}
