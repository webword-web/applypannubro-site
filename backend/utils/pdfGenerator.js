const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateInvoicePDF = (order, callback) => {
  try {
    const doc = new PDFDocument({ margin: 50 });
    
    // Create a buffer to return the PDF data
    const buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      callback(null, pdfData);
    });

    // Invoice Header
    doc
      .fillColor('#333333')
      .fontSize(20)
      .text('Apply Pannu Bro', 50, 57)
      .fontSize(10)
      .text('Digital Service Management Platform', 50, 80)
      .fontSize(10)
      .text(`Invoice Number: ${order.invoiceNumber}`, 400, 57, { align: 'right' })
      .text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 400, 72, { align: 'right' })
      .text(`Status: ${order.paymentStatus}`, 400, 87, { align: 'right' });

    doc.moveTo(50, 110).lineTo(550, 110).stroke();

    // Customer Info
    doc
      .fontSize(12)
      .text('Billed To:', 50, 130)
      .fontSize(10)
      .text(`Customer Name: ${order.customerName}`, 50, 145)
      .text(`Mobile Number: ${order.mobileNumber}`, 50, 160);

    doc.moveTo(50, 185).lineTo(550, 185).stroke();

    // Order Details Table Header
    let y = 210;
    doc
      .fontSize(10)
      .text('Service Type', 50, y)
      .text('Details', 150, y)
      .text('Quantity', 350, y, { width: 90, align: 'right' })
      .text('Amount', 450, y, { width: 90, align: 'right' });

    doc.moveTo(50, y + 15).lineTo(550, y + 15).stroke();
    
    y += 30;

    // Order Items
    doc
      .fontSize(10)
      .text(order.serviceType, 50, y)
      .text(order.service?.name || 'Service', 150, y)
      .text(order.quantity.toString(), 350, y, { width: 90, align: 'right' })
      .text(`Rs ${order.amount}`, 450, y, { width: 90, align: 'right' });

    if (order.correctionDetails) {
      y += 20;
      doc.text(`Correction: ${order.correctionDetails}`, 150, y);
    }

    doc.moveTo(50, y + 30).lineTo(550, y + 30).stroke();

    y += 50;

    // Totals
    doc
      .fontSize(12)
      .text('Total Amount:', 350, y, { width: 90, align: 'right' })
      .text(`Rs ${order.amount}`, 450, y, { width: 90, align: 'right' });

    // Footer
    doc
      .fontSize(10)
      .text('Thank you for choosing Apply Pannu Bro!', 50, 700, { align: 'center', width: 500 });

    doc.end();
  } catch (error) {
    callback(error, null);
  }
};

module.exports = { generateInvoicePDF };
