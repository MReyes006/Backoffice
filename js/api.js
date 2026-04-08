<<<<<<< HEAD
// async function referrals(email) {
//     try {
//        const response = await fetch(`https://shopifyadminapi.8motiv.com/api/uppromote/referrals?email=${encodeURIComponent(email)}`);
    
//         if (!response.ok) {
//             throw new Error(`Error HTTP: ${response.status}`);
//         }
        
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.log('error', error);
//         throw error; 
//     }
// }


// async function paymentHistory(email) {
  
//     try {
//         const response = await fetch(`https://shopifyadminapi.8motiv.com/api/uppromote/payments?email=${encodeURIComponent(email)}`);
    
//         if (!response.ok) {
//             throw new Error(`Error HTTP: ${response.status}`);
//         }
        
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.log('error', error);
//         throw error; 
//     }
// }

// async function verifyCredentialsAffiliate(affiliateId, email) {
//     // console.log("🚀 ~ verifyCredentialsAffiliate ~ email:", email)
//     // console.log("🚀 ~ verifyCredentialsAffiliate ~ affiliateId:", affiliateId)
    
//   try {
//     const response = await fetch(`https://shopifyadminapi.8motiv.com/api/uppromote/verify-credentials?affiliateId=${encodeURIComponent(affiliateId)}&email=${encodeURIComponent(email)}`);
    
//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.error || `Error ${response.status}`);
//     }
    
//     const data = await response.json();
    
//     if (!data.success) {
//         throw new Error(data.error || 'Error al verificar credenciales');
//     }
    
//     console.log("🚀 ~ verifyCredentialsAffiliate ~ data:", data)
//     return data.data;
//   } catch (error) {
//     console.error('Error al verificar credenciales:', error);
//     throw error;
//   }
// }

// async function getOrderAffiliate(orderNumber) {
//     try {
//         const response = await fetch(`https://shopifyadminapi.8motiv.com/api/OrderAffiliate/${encodeURIComponent(orderNumber)}`);
    
//         if (!response.ok) {
//             throw new Error(`Error HTTP: ${response.status}`);
//         }
        
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.log('error', error);
//         throw error; 
//     }
// }
/* =========================
   🔥 DATA
========================= */

/* =========================
   🔥 DATA
========================= */

const salesClients = [
  { date: "2025-02-01", newClients: 5, existingClients: 3 },
  { date: "2025-03-01", newClients: 7, existingClients: 5 },
  { date: "2025-04-01", newClients: 15, existingClients: 10 },
  { date: "2025-05-01", newClients: 9, existingClients: 8 },
  { date: "2025-06-01", newClients: 14, existingClients: 11 },
  { date: "2025-07-01", newClients: 6, existingClients: 4 },
  { date: "2025-08-01", newClients: 11, existingClients: 9 },
  { date: "2025-09-01", newClients: 2, existingClients: 4 },
  { date: "2025-10-01", newClients: 1, existingClients: 5 },
  { date: "2025-11-01", newClients: 5, existingClients: 5 },
  { date: "2025-12-01", newClients: 10, existingClients: 6 },
  { date: "2026-01-01", newClients: 8, existingClients: 7 },
  { date: "2026-02-07", newClients: 3, existingClients: 2 },
  { date: "2026-02-08", newClients: 4, existingClients: 3 },
  { date: "2026-02-09", newClients: 2, existingClients: 1 },
  { date: "2026-02-10", newClients: 5, existingClients: 4 },
  { date: "2026-02-11", newClients: 6, existingClients: 3 },
  { date: "2026-02-12", newClients: 4, existingClients: 5 },
  { date: "2026-02-13", newClients: 9, existingClients: 8 },
  { date: "2026-02-14", newClients: 10, existingClients: 10 },
  { date: "2026-02-15", newClients: 12, existingClients: 9 },
  { date: "2026-02-16", newClients: 7, existingClients: 6 }
];

// const salesAmountData = [
//   { date: "2025-02-01", newClients: 2500, existingClients: 1500 },
//   { date: "2025-03-01", newClients: 3500, existingClients: 2500 },
//   { date: "2025-04-01", newClients: 7500, existingClients: 5000 },
//   { date: "2025-05-01", newClients: 4500, existingClients: 4000 },
//   { date: "2025-06-01", newClients: 7000, existingClients: 5500 },
//   { date: "2025-07-01", newClients: 3000, existingClients: 2000 },
//   { date: "2025-08-01", newClients: 5500, existingClients: 4500 },
//   { date: "2025-09-01", newClients: 1000, existingClients: 2000 },
//   { date: "2025-10-01", newClients: 500, existingClients: 2500 },
//   { date: "2025-11-01", newClients: 2500, existingClients: 2500 },
//   { date: "2025-12-01", newClients: 5000, existingClients: 3000 },
//   { date: "2026-01-01", newClients: 4000, existingClients: 3500 },
//   { date: "2026-02-07", newClients: 1500, existingClients: 1000 },
//   { date: "2026-02-08", newClients: 2000, existingClients: 1500 },
//   { date: "2026-02-09", newClients: 1000, existingClients: 500 },
//   { date: "2026-02-10", newClients: 2500, existingClients: 2000 },
//   { date: "2026-02-11", newClients: 3000, existingClients: 1500 },
//   { date: "2026-02-12", newClients: 2000, existingClients: 2500 },
//   { date: "2026-02-13", newClients: 4500, existingClients: 4000 },
//   { date: "2026-02-14", newClients: 5000, existingClients: 5000 },
//   { date: "2026-02-15", newClients: 6000, existingClients: 4500 },
//   { date: "2026-02-16", newClients: 3500, existingClients: 3000 }
// ];




/* =========================
   🔥 DATA - SALES AMOUNT (BASE)
========================= */

const salesAmountData = [
  { date: "2025-02-01", newClients: 2500, existingClients: 1500 },
  { date: "2025-03-01", newClients: 3500, existingClients: 2500 },
  { date: "2025-04-01", newClients: 7500, existingClients: 5000 },
  { date: "2025-05-01", newClients: 4500, existingClients: 4000 },
  { date: "2025-06-01", newClients: 7000, existingClients: 5500 },
  { date: "2025-07-01", newClients: 3000, existingClients: 2000 },
  { date: "2025-08-01", newClients: 5500, existingClients: 4500 },
  { date: "2025-09-01", newClients: 1000, existingClients: 2000 },
  { date: "2025-10-01", newClients: 500, existingClients: 2500 },
  { date: "2025-11-01", newClients: 2500, existingClients: 2500 },
  { date: "2025-12-01", newClients: 5000, existingClients: 3000 },
  { date: "2026-01-01", newClients: 4000, existingClients: 3500 },
  { date: "2026-02-07", newClients: 1500, existingClients: 1000 },
  { date: "2026-02-08", newClients: 2000, existingClients: 1500 },
  { date: "2026-02-09", newClients: 1000, existingClients: 500 },
  { date: "2026-02-10", newClients: 2500, existingClients: 2000 },
  { date: "2026-02-11", newClients: 3000, existingClients: 1500 },
  { date: "2026-02-12", newClients: 2000, existingClients: 2500 },
  { date: "2026-02-13", newClients: 4500, existingClients: 4000 },
  { date: "2026-02-14", newClients: 5000, existingClients: 5000 },
  { date: "2026-02-15", newClients: 6000, existingClients: 4500 },
  { date: "2026-02-16", newClients: 3500, existingClients: 3000 }
];



/* =========================
   🔥 DATA COMMISSION
========================= */

// const commissionData = [
//   // Febrero 2026
//   { date: "2026-02-16", newPending: 150.00, newPaid: 0, newCancelled: 0, existingPending: 80.00, existingPaid: 0, existingCancelled: 0 },
//   { date: "2026-02-15", newPending: 230.00, newPaid: 89.00, newCancelled: 0, existingPending: 0, existingPaid: 120.00, existingCancelled: 0 },
//   { date: "2026-02-14", newPending: 0, newPaid: 320.00, newCancelled: 45.00, existingPending: 95.00, existingPaid: 180.00, existingCancelled: 0 },
//   { date: "2026-02-13", newPending: 180.00, newPaid: 0, newCancelled: 0, existingPending: 0, existingPaid: 250.00, existingCancelled: 35.00 },
//   { date: "2026-02-12", newPending: 0, newPaid: 210.00, newCancelled: 0, existingPending: 110.00, existingPaid: 0, existingCancelled: 0 },
//   { date: "2026-02-11", newPending: 75.00, newPaid: 120.00, newCancelled: 0, existingPending: 0, existingPaid: 190.00, existingCancelled: 0 },
//   { date: "2026-02-10", newPending: 0, newPaid: 98.00, newCancelled: 35.00, existingPending: 65.00, existingPaid: 0, existingCancelled: 25.00 },
//   { date: "2026-02-09", newPending: 110.00, newPaid: 0, newCancelled: 0, existingPending: 0, existingPaid: 145.00, existingCancelled: 0 },
//   { date: "2026-02-08", newPending: 0, newPaid: 185.00, newCancelled: 0, existingPending: 85.00, existingPaid: 0, existingCancelled: 0 },
//   { date: "2026-02-07", newPending: 95.00, newPaid: 140.00, newCancelled: 0, existingPending: 0, existingPaid: 210.00, existingCancelled: 40.00 },
  
//   // Enero 2026
//   { date: "2026-01-28", newPending: 0, newPaid: 350.00, newCancelled: 0, existingPending: 0, existingPaid: 280.00, existingCancelled: 0 },
//   { date: "2026-01-25", newPending: 0, newPaid: 190.00, newCancelled: 55.00, existingPending: 0, existingPaid: 220.00, existingCancelled: 30.00 },
//   { date: "2026-01-20", newPending: 0, newPaid: 280.00, newCancelled: 0, existingPending: 0, existingPaid: 310.00, existingCancelled: 0 },
//   { date: "2026-01-15", newPending: 0, newPaid: 110.00, newCancelled: 0, existingPending: 0, existingPaid: 150.00, existingCancelled: 45.00 },
//   { date: "2026-01-10", newPending: 0, newPaid: 420.00, newCancelled: 0, existingPending: 0, existingPaid: 380.00, existingCancelled: 0 },
//   { date: "2026-01-05", newPending: 0, newPaid: 67.00, newCancelled: 25.00, existingPending: 0, existingPaid: 95.00, existingCancelled: 0 },
  
//   // Diciembre 2025
//   { date: "2025-12-28", newPending: 0, newPaid: 520.00, newCancelled: 0, existingPending: 0, existingPaid: 410.00, existingCancelled: 0 },
//   { date: "2025-12-22", newPending: 0, newPaid: 310.00, newCancelled: 0, existingPending: 0, existingPaid: 265.00, existingCancelled: 35.00 },
//   { date: "2025-12-18", newPending: 0, newPaid: 0, newCancelled: 89.00, existingPending: 0, existingPaid: 180.00, existingCancelled: 0 },
//   { date: "2025-12-15", newPending: 0, newPaid: 240.00, newCancelled: 0, existingPending: 0, existingPaid: 195.00, existingCancelled: 0 },
//   { date: "2025-12-10", newPending: 0, newPaid: 175.00, newCancelled: 0, existingPending: 0, existingPaid: 140.00, existingCancelled: 25.00 },
//   { date: "2025-12-05", newPending: 0, newPaid: 380.00, newCancelled: 45.00, existingPending: 0, existingPaid: 290.00, existingCancelled: 0 },
  
//   // Noviembre 2025
//   { date: "2025-11-25", newPending: 0, newPaid: 220.00, newCancelled: 0, existingPending: 0, existingPaid: 185.00, existingCancelled: 0 },
//   { date: "2025-11-20", newPending: 0, newPaid: 140.00, newCancelled: 0, existingPending: 0, existingPaid: 120.00, existingCancelled: 30.00 },
//   { date: "2025-11-15", newPending: 0, newPaid: 0, newCancelled: 95.00, existingPending: 0, existingPaid: 0, existingCancelled: 40.00 },
//   { date: "2025-11-10", newPending: 0, newPaid: 330.00, newCancelled: 0, existingPending: 0, existingPaid: 275.00, existingCancelled: 0 },
//   { date: "2025-11-05", newPending: 0, newPaid: 185.00, newCancelled: 0, existingPending: 0, existingPaid: 150.00, existingCancelled: 0 },
  
//   // Octubre 2025
//   { date: "2025-10-28", newPending: 0, newPaid: 290.00, newCancelled: 0, existingPending: 0, existingPaid: 240.00, existingCancelled: 0 },
//   { date: "2025-10-22", newPending: 0, newPaid: 160.00, newCancelled: 0, existingPending: 0, existingPaid: 130.00, existingCancelled: 25.00 },
//   { date: "2025-10-15", newPending: 0, newPaid: 0, newCancelled: 78.00, existingPending: 0, existingPaid: 0, existingCancelled: 35.00 },
//   { date: "2025-10-10", newPending: 0, newPaid: 410.00, newCancelled: 0, existingPending: 0, existingPaid: 350.00, existingCancelled: 0 },
//   { date: "2025-10-05", newPending: 0, newPaid: 235.00, newCancelled: 0, existingPending: 0, existingPaid: 190.00, existingCancelled: 0 },
  
//   // Septiembre 2025
//   { date: "2025-09-25", newPending: 0, newPaid: 195.00, newCancelled: 0, existingPending: 0, existingPaid: 160.00, existingCancelled: 0 },
//   { date: "2025-09-20", newPending: 0, newPaid: 360.00, newCancelled: 0, existingPending: 0, existingPaid: 295.00, existingCancelled: 20.00 },
//   { date: "2025-09-15", newPending: 0, newPaid: 125.00, newCancelled: 0, existingPending: 0, existingPaid: 100.00, existingCancelled: 0 },
//   { date: "2025-09-10", newPending: 0, newPaid: 0, newCancelled: 89.00, existingPending: 0, existingPaid: 0, existingCancelled: 45.00 },
//   { date: "2025-09-05", newPending: 0, newPaid: 270.00, newCancelled: 0, existingPending: 0, existingPaid: 220.00, existingCancelled: 0 },
  
//   // Agosto 2025
//   { date: "2025-08-28", newPending: 0, newPaid: 450.00, newCancelled: 0, existingPending: 0, existingPaid: 380.00, existingCancelled: 0 },
//   { date: "2025-08-22", newPending: 0, newPaid: 210.00, newCancelled: 0, existingPending: 0, existingPaid: 175.00, existingCancelled: 30.00 },
//   { date: "2025-08-15", newPending: 0, newPaid: 170.00, newCancelled: 0, existingPending: 0, existingPaid: 140.00, existingCancelled: 0 },
//   { date: "2025-08-10", newPending: 0, newPaid: 320.00, newCancelled: 0, existingPending: 0, existingPaid: 265.00, existingCancelled: 0 },
//   { date: "2025-08-05", newPending: 0, newPaid: 0, newCancelled: 98.00, existingPending: 0, existingPaid: 0, existingCancelled: 55.00 },
  
//   // Julio 2025
//   { date: "2025-07-25", newPending: 0, newPaid: 280.00, newCancelled: 0, existingPending: 0, existingPaid: 230.00, existingCancelled: 0 },
//   { date: "2025-07-20", newPending: 0, newPaid: 150.00, newCancelled: 0, existingPending: 0, existingPaid: 125.00, existingCancelled: 25.00 },
//   { date: "2025-07-15", newPending: 0, newPaid: 390.00, newCancelled: 0, existingPending: 0, existingPaid: 320.00, existingCancelled: 0 },
//   { date: "2025-07-10", newPending: 0, newPaid: 110.00, newCancelled: 0, existingPending: 0, existingPaid: 90.00, existingCancelled: 0 },
//   { date: "2025-07-05", newPending: 0, newPaid: 0, newCancelled: 65.00, existingPending: 0, existingPaid: 0, existingCancelled: 40.00 },
  
//   // Junio 2025
//   { date: "2025-06-28", newPending: 0, newPaid: 240.00, newCancelled: 0, existingPending: 0, existingPaid: 195.00, existingCancelled: 0 },
//   { date: "2025-06-22", newPending: 0, newPaid: 185.00, newCancelled: 0, existingPending: 0, existingPaid: 150.00, existingCancelled: 20.00 },
//   { date: "2025-06-15", newPending: 0, newPaid: 310.00, newCancelled: 0, existingPending: 0, existingPaid: 255.00, existingCancelled: 0 },
//   { date: "2025-06-10", newPending: 0, newPaid: 92.00, newCancelled: 0, existingPending: 0, existingPaid: 75.00, existingCancelled: 0 },
//   { date: "2025-06-05", newPending: 0, newPaid: 140.00, newCancelled: 35.00, existingPending: 0, existingPaid: 115.00, existingCancelled: 0 },
  
//   // Mayo 2025
//   { date: "2025-05-25", newPending: 0, newPaid: 265.00, newCancelled: 0, existingPending: 0, existingPaid: 215.00, existingCancelled: 0 },
//   { date: "2025-05-20", newPending: 0, newPaid: 130.00, newCancelled: 0, existingPending: 0, existingPaid: 105.00, existingCancelled: 25.00 },
//   { date: "2025-05-15", newPending: 0, newPaid: 420.00, newCancelled: 0, existingPending: 0, existingPaid: 345.00, existingCancelled: 0 },
//   { date: "2025-05-10", newPending: 0, newPaid: 0, newCancelled: 78.00, existingPending: 0, existingPaid: 0, existingCancelled: 45.00 },
//   { date: "2025-05-05", newPending: 0, newPaid: 195.00, newCancelled: 0, existingPending: 0, existingPaid: 160.00, existingCancelled: 0 },
  
//   // Abril 2025
//   { date: "2025-04-28", newPending: 0, newPaid: 370.00, newCancelled: 0, existingPending: 0, existingPaid: 305.00, existingCancelled: 0 },
//   { date: "2025-04-22", newPending: 0, newPaid: 220.00, newCancelled: 0, existingPending: 0, existingPaid: 180.00, existingCancelled: 30.00 },
//   { date: "2025-04-15", newPending: 0, newPaid: 160.00, newCancelled: 0, existingPending: 0, existingPaid: 130.00, existingCancelled: 0 },
//   { date: "2025-04-10", newPending: 0, newPaid: 89.00, newCancelled: 0, existingPending: 0, existingPaid: 72.00, existingCancelled: 0 },
//   { date: "2025-04-05", newPending: 0, newPaid: 290.00, newCancelled: 42.00, existingPending: 0, existingPaid: 240.00, existingCancelled: 0 },
  
//   // Marzo 2025
//   { date: "2025-03-25", newPending: 0, newPaid: 145.00, newCancelled: 0, existingPending: 0, existingPaid: 120.00, existingCancelled: 0 },
//   { date: "2025-03-20", newPending: 0, newPaid: 340.00, newCancelled: 0, existingPending: 0, existingPaid: 280.00, existingCancelled: 25.00 },
//   { date: "2025-03-15", newPending: 0, newPaid: 210.00, newCancelled: 0, existingPending: 0, existingPaid: 170.00, existingCancelled: 0 },
//   { date: "2025-03-10", newPending: 0, newPaid: 0, newCancelled: 56.00, existingPending: 0, existingPaid: 0, existingCancelled: 35.00 },
//   { date: "2025-03-05", newPending: 0, newPaid: 180.00, newCancelled: 0, existingPending: 0, existingPaid: 145.00, existingCancelled: 0 },
  
//   // Febrero 2025
//   { date: "2025-02-25", newPending: 0, newPaid: 250.00, newCancelled: 0, existingPending: 0, existingPaid: 205.00, existingCancelled: 0 },
//   { date: "2025-02-20", newPending: 0, newPaid: 175.00, newCancelled: 0, existingPending: 0, existingPaid: 140.00, existingCancelled: 20.00 },
//   { date: "2025-02-15", newPending: 0, newPaid: 300.00, newCancelled: 0, existingPending: 0, existingPaid: 245.00, existingCancelled: 0 },
//   { date: "2025-02-10", newPending: 0, newPaid: 92.00, newCancelled: 0, existingPending: 0, existingPaid: 75.00, existingCancelled: 0 },
//   { date: "2025-02-05", newPending: 0, newPaid: 135.00, newCancelled: 38.00, existingPending: 0, existingPaid: 110.00, existingCancelled: 0 }
// ];


/* =========================
   🔥 DATA - COMMISSION (10% de ventas + pagos y cancelaciones)
   Commission Rate = 10%
========================= */

const commissionData = [
  // Febrero 2025 - Comisiones = 10% de ventas
  // New: 2500 * 10% = 250, Existing: 1500 * 10% = 150
  { date: "2025-02-01", newCommission: 250, existingCommission: 150, paid: 300, cancelled: 0 },
  
  // Marzo 2025 - New: 3500 * 10% = 350, Existing: 2500 * 10% = 250
  { date: "2025-03-01", newCommission: 350, existingCommission: 250, paid: 400, cancelled: 50 },
  
  // Abril 2025 - New: 7500 * 10% = 750, Existing: 5000 * 10% = 500
  { date: "2025-04-01", newCommission: 750, existingCommission: 500, paid: 1000, cancelled: 0 },
  
  // Mayo 2025 - New: 4500 * 10% = 450, Existing: 4000 * 10% = 400
  { date: "2025-05-01", newCommission: 450, existingCommission: 400, paid: 600, cancelled: 50 },
  
  // Junio 2025 - New: 7000 * 10% = 700, Existing: 5500 * 10% = 550
  { date: "2025-06-01", newCommission: 700, existingCommission: 550, paid: 1000, cancelled: 0 },
  
  // Julio 2025 - New: 3000 * 10% = 300, Existing: 2000 * 10% = 200
  { date: "2025-07-01", newCommission: 300, existingCommission: 200, paid: 400, cancelled: 50 },
  
  // Agosto 2025 - New: 5500 * 10% = 550, Existing: 4500 * 10% = 450
  { date: "2025-08-01", newCommission: 550, existingCommission: 450, paid: 800, cancelled: 0 },
  
  // Septiembre 2025 - New: 1000 * 10% = 100, Existing: 2000 * 10% = 200
  { date: "2025-09-01", newCommission: 100, existingCommission: 200, paid: 200, cancelled: 50 },
  
  // Octubre 2025 - New: 500 * 10% = 50, Existing: 2500 * 10% = 250
  { date: "2025-10-01", newCommission: 50, existingCommission: 250, paid: 200, cancelled: 0 },
  
  // Noviembre 2025 - New: 2500 * 10% = 250, Existing: 2500 * 10% = 250
  { date: "2025-11-01", newCommission: 250, existingCommission: 250, paid: 400, cancelled: 0 },
  
  // Diciembre 2025 - New: 5000 * 10% = 500, Existing: 3000 * 10% = 300
  { date: "2025-12-01", newCommission: 500, existingCommission: 300, paid: 600, cancelled: 50 },
  
  // Enero 2026 - New: 4000 * 10% = 400, Existing: 3500 * 10% = 350
  { date: "2026-01-01", newCommission: 400, existingCommission: 350, paid: 500, cancelled: 0 },
  
  // Febrero 2026 (datos diarios)
  { date: "2026-02-07", newCommission: 150, existingCommission: 100, paid: 100, cancelled: 0 },
  { date: "2026-02-08", newCommission: 200, existingCommission: 150, paid: 150, cancelled: 0 },
  { date: "2026-02-09", newCommission: 100, existingCommission: 50, paid: 50, cancelled: 0 },
  { date: "2026-02-10", newCommission: 250, existingCommission: 200, paid: 200, cancelled: 50 },
  { date: "2026-02-11", newCommission: 300, existingCommission: 150, paid: 200, cancelled: 0 },
  { date: "2026-02-12", newCommission: 200, existingCommission: 250, paid: 300, cancelled: 0 },
  { date: "2026-02-13", newCommission: 450, existingCommission: 400, paid: 500, cancelled: 0 },
  { date: "2026-02-14", newCommission: 500, existingCommission: 500, paid: 600, cancelled: 50 },
  { date: "2026-02-15", newCommission: 600, existingCommission: 450, paid: 700, cancelled: 0 },
  { date: "2026-02-16", newCommission: 350, existingCommission: 300, paid: 400, cancelled: 0 }
];


/* =========================
   🔥 DATA DE TRANSACCIONES DETALLADAS
========================= */

const transactionsData = [
  // Febrero 2026
  { date: "2026-02-16", orderNumber: "ORD-2026-0216", totalSales: 4000.00, commissionRate: 10, commission: 400.00, status: "paid" },
  { date: "2026-02-15", orderNumber: "ORD-2026-0215", totalSales: 7000.00, commissionRate: 10, commission: 700.00, status: "paid" },
  { date: "2026-02-14", orderNumber: "ORD-2026-0214", totalSales: 6500.00, commissionRate: 10, commission: 650.00, status: "paid" },
  { date: "2026-02-14", orderNumber: "ORD-2026-0214B", totalSales: 500.00, commissionRate: 10, commission: 50.00, status: "declined" },
  { date: "2026-02-13", orderNumber: "ORD-2026-0213", totalSales: 5000.00, commissionRate: 10, commission: 500.00, status: "paid" },
  { date: "2026-02-12", orderNumber: "ORD-2026-0212", totalSales: 3000.00, commissionRate: 10, commission: 300.00, status: "paid" },
  { date: "2026-02-11", orderNumber: "ORD-2026-0211", totalSales: 2000.00, commissionRate: 10, commission: 200.00, status: "paid" },
  { date: "2026-02-10", orderNumber: "ORD-2026-0210", totalSales: 2000.00, commissionRate: 10, commission: 200.00, status: "paid" },
  { date: "2026-02-10", orderNumber: "ORD-2026-0210B", totalSales: 500.00, commissionRate: 10, commission: 50.00, status: "declined" },
  { date: "2026-02-09", orderNumber: "ORD-2026-0209", totalSales: 500.00, commissionRate: 10, commission: 50.00, status: "paid" },
  
  // Enero 2026
  { date: "2026-01-28", orderNumber: "ORD-2026-0128", totalSales: 2000.00, commissionRate: 10, commission: 200.00, status: "paid" },
  { date: "2026-01-25", orderNumber: "ORD-2026-0125", totalSales: 1500.00, commissionRate: 10, commission: 150.00, status: "paid" },
  { date: "2026-01-20", orderNumber: "ORD-2026-0120", totalSales: 1000.00, commissionRate: 10, commission: 100.00, status: "paid" },
  { date: "2026-01-15", orderNumber: "ORD-2026-0115", totalSales: 500.00, commissionRate: 10, commission: 50.00, status: "paid" },
  
  // Diciembre 2025
  { date: "2025-12-28", orderNumber: "ORD-2025-1228", totalSales: 3000.00, commissionRate: 10, commission: 300.00, status: "paid" },
  { date: "2025-12-22", orderNumber: "ORD-2025-1222", totalSales: 2000.00, commissionRate: 10, commission: 200.00, status: "paid" },
  { date: "2025-12-22", orderNumber: "ORD-2025-1222B", totalSales: 500.00, commissionRate: 10, commission: 50.00, status: "declined" },
  { date: "2025-12-15", orderNumber: "ORD-2025-1215", totalSales: 1000.00, commissionRate: 10, commission: 100.00, status: "paid" },
  
  // Noviembre 2025
  { date: "2025-11-25", orderNumber: "ORD-2025-1125", totalSales: 2000.00, commissionRate: 10, commission: 200.00, status: "paid" },
  { date: "2025-11-20", orderNumber: "ORD-2025-1120", totalSales: 1500.00, commissionRate: 10, commission: 150.00, status: "paid" },
  { date: "2025-11-15", orderNumber: "ORD-2025-1115", totalSales: 500.00, commissionRate: 10, commission: 50.00, status: "paid" },
  
  // Octubre 2025
  { date: "2025-10-28", orderNumber: "ORD-2025-1028", totalSales: 1000.00, commissionRate: 10, commission: 100.00, status: "paid" },
  { date: "2025-10-20", orderNumber: "ORD-2025-1020", totalSales: 1000.00, commissionRate: 10, commission: 100.00, status: "paid" },
  
  // Septiembre 2025
  { date: "2025-09-25", orderNumber: "ORD-2025-0925", totalSales: 1500.00, commissionRate: 10, commission: 150.00, status: "paid" },
  { date: "2025-09-15", orderNumber: "ORD-2025-0915", totalSales: 500.00, commissionRate: 10, commission: 50.00, status: "paid" },
  
  // Agosto 2025
  { date: "2025-08-28", orderNumber: "ORD-2025-0828", totalSales: 5000.00, commissionRate: 10, commission: 500.00, status: "paid" },
  { date: "2025-08-20", orderNumber: "ORD-2025-0820", totalSales: 3000.00, commissionRate: 10, commission: 300.00, status: "paid" },
  
  // Julio 2025
  { date: "2025-07-25", orderNumber: "ORD-2025-0725", totalSales: 5000.00, commissionRate: 10, commission: 500.00, status: "paid" },
  { date: "2025-07-15", orderNumber: "ORD-2025-0715", totalSales: 4000.00, commissionRate: 10, commission: 400.00, status: "paid" },
  
  // Junio 2025
  { date: "2025-06-28", orderNumber: "ORD-2025-0628", totalSales: 5000.00, commissionRate: 10, commission: 500.00, status: "paid" },
  { date: "2025-06-15", orderNumber: "ORD-2025-0615", totalSales: 4500.00, commissionRate: 10, commission: 450.00, status: "paid" },
  
  // Mayo 2025
  { date: "2025-05-25", orderNumber: "ORD-2025-0525", totalSales: 5000.00, commissionRate: 10, commission: 500.00, status: "paid" },
  { date: "2025-05-15", orderNumber: "ORD-2025-0515", totalSales: 3250.00, commissionRate: 10, commission: 325.00, status: "paid" },
  
  // Abril 2025
  { date: "2025-04-28", orderNumber: "ORD-2025-0428", totalSales: 5000.00, commissionRate: 10, commission: 500.00, status: "paid" },
  { date: "2025-04-15", orderNumber: "ORD-2025-0415", totalSales: 4270.00, commissionRate: 10, commission: 427.00, status: "paid" },
  
  // Marzo 2025
  { date: "2025-03-25", orderNumber: "ORD-2025-0325", totalSales: 4000.00, commissionRate: 10, commission: 400.00, status: "paid" },
  { date: "2025-03-15", orderNumber: "ORD-2025-0315", totalSales: 4750.00, commissionRate: 10, commission: 475.00, status: "paid" },
  
  // Febrero 2025
  { date: "2025-02-25", orderNumber: "ORD-2025-0225", totalSales: 2500.00, commissionRate: 10, commission: 250.00, status: "paid" },
  { date: "2025-02-15", orderNumber: "ORD-2025-0215", totalSales: 2250.00, commissionRate: 10, commission: 225.00, status: "paid" }
=======
// async function referrals(email) {
//     try {
//        const response = await fetch(`https://shopifyadminapi.8motiv.com/api/uppromote/referrals?email=${encodeURIComponent(email)}`);
    
//         if (!response.ok) {
//             throw new Error(`Error HTTP: ${response.status}`);
//         }
        
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.log('error', error);
//         throw error; 
//     }
// }


// async function paymentHistory(email) {
  
//     try {
//         const response = await fetch(`https://shopifyadminapi.8motiv.com/api/uppromote/payments?email=${encodeURIComponent(email)}`);
    
//         if (!response.ok) {
//             throw new Error(`Error HTTP: ${response.status}`);
//         }
        
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.log('error', error);
//         throw error; 
//     }
// }

// async function verifyCredentialsAffiliate(affiliateId, email) {
//     // console.log("🚀 ~ verifyCredentialsAffiliate ~ email:", email)
//     // console.log("🚀 ~ verifyCredentialsAffiliate ~ affiliateId:", affiliateId)
    
//   try {
//     const response = await fetch(`https://shopifyadminapi.8motiv.com/api/uppromote/verify-credentials?affiliateId=${encodeURIComponent(affiliateId)}&email=${encodeURIComponent(email)}`);
    
//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.error || `Error ${response.status}`);
//     }
    
//     const data = await response.json();
    
//     if (!data.success) {
//         throw new Error(data.error || 'Error al verificar credenciales');
//     }
    
//     console.log("🚀 ~ verifyCredentialsAffiliate ~ data:", data)
//     return data.data;
//   } catch (error) {
//     console.error('Error al verificar credenciales:', error);
//     throw error;
//   }
// }

// async function getOrderAffiliate(orderNumber) {
//     try {
//         const response = await fetch(`https://shopifyadminapi.8motiv.com/api/OrderAffiliate/${encodeURIComponent(orderNumber)}`);
    
//         if (!response.ok) {
//             throw new Error(`Error HTTP: ${response.status}`);
//         }
        
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.log('error', error);
//         throw error; 
//     }
// }
/* =========================
   🔥 DATA
========================= */

/* =========================
   🔥 DATA
========================= */

const salesClients = [
  { date: "2025-02-01", newClients: 5, existingClients: 3 },
  { date: "2025-03-01", newClients: 7, existingClients: 5 },
  { date: "2025-04-01", newClients: 15, existingClients: 10 },
  { date: "2025-05-01", newClients: 9, existingClients: 8 },
  { date: "2025-06-01", newClients: 14, existingClients: 11 },
  { date: "2025-07-01", newClients: 6, existingClients: 4 },
  { date: "2025-08-01", newClients: 11, existingClients: 9 },
  { date: "2025-09-01", newClients: 2, existingClients: 4 },
  { date: "2025-10-01", newClients: 1, existingClients: 5 },
  { date: "2025-11-01", newClients: 5, existingClients: 5 },
  { date: "2025-12-01", newClients: 10, existingClients: 6 },
  { date: "2026-01-01", newClients: 8, existingClients: 7 },
  { date: "2026-02-07", newClients: 3, existingClients: 2 },
  { date: "2026-02-08", newClients: 4, existingClients: 3 },
  { date: "2026-02-09", newClients: 2, existingClients: 1 },
  { date: "2026-02-10", newClients: 5, existingClients: 4 },
  { date: "2026-02-11", newClients: 6, existingClients: 3 },
  { date: "2026-02-12", newClients: 4, existingClients: 5 },
  { date: "2026-02-13", newClients: 9, existingClients: 8 },
  { date: "2026-02-14", newClients: 10, existingClients: 10 },
  { date: "2026-02-15", newClients: 12, existingClients: 9 },
  { date: "2026-02-16", newClients: 7, existingClients: 6 }
];

// const salesAmountData = [
//   { date: "2025-02-01", newClients: 2500, existingClients: 1500 },
//   { date: "2025-03-01", newClients: 3500, existingClients: 2500 },
//   { date: "2025-04-01", newClients: 7500, existingClients: 5000 },
//   { date: "2025-05-01", newClients: 4500, existingClients: 4000 },
//   { date: "2025-06-01", newClients: 7000, existingClients: 5500 },
//   { date: "2025-07-01", newClients: 3000, existingClients: 2000 },
//   { date: "2025-08-01", newClients: 5500, existingClients: 4500 },
//   { date: "2025-09-01", newClients: 1000, existingClients: 2000 },
//   { date: "2025-10-01", newClients: 500, existingClients: 2500 },
//   { date: "2025-11-01", newClients: 2500, existingClients: 2500 },
//   { date: "2025-12-01", newClients: 5000, existingClients: 3000 },
//   { date: "2026-01-01", newClients: 4000, existingClients: 3500 },
//   { date: "2026-02-07", newClients: 1500, existingClients: 1000 },
//   { date: "2026-02-08", newClients: 2000, existingClients: 1500 },
//   { date: "2026-02-09", newClients: 1000, existingClients: 500 },
//   { date: "2026-02-10", newClients: 2500, existingClients: 2000 },
//   { date: "2026-02-11", newClients: 3000, existingClients: 1500 },
//   { date: "2026-02-12", newClients: 2000, existingClients: 2500 },
//   { date: "2026-02-13", newClients: 4500, existingClients: 4000 },
//   { date: "2026-02-14", newClients: 5000, existingClients: 5000 },
//   { date: "2026-02-15", newClients: 6000, existingClients: 4500 },
//   { date: "2026-02-16", newClients: 3500, existingClients: 3000 }
// ];




/* =========================
   🔥 DATA - SALES AMOUNT (BASE)
========================= */

const salesAmountData = [
  { date: "2025-02-01", newClients: 2500, existingClients: 1500 },
  { date: "2025-03-01", newClients: 3500, existingClients: 2500 },
  { date: "2025-04-01", newClients: 7500, existingClients: 5000 },
  { date: "2025-05-01", newClients: 4500, existingClients: 4000 },
  { date: "2025-06-01", newClients: 7000, existingClients: 5500 },
  { date: "2025-07-01", newClients: 3000, existingClients: 2000 },
  { date: "2025-08-01", newClients: 5500, existingClients: 4500 },
  { date: "2025-09-01", newClients: 1000, existingClients: 2000 },
  { date: "2025-10-01", newClients: 500, existingClients: 2500 },
  { date: "2025-11-01", newClients: 2500, existingClients: 2500 },
  { date: "2025-12-01", newClients: 5000, existingClients: 3000 },
  { date: "2026-01-01", newClients: 4000, existingClients: 3500 },
  { date: "2026-02-07", newClients: 1500, existingClients: 1000 },
  { date: "2026-02-08", newClients: 2000, existingClients: 1500 },
  { date: "2026-02-09", newClients: 1000, existingClients: 500 },
  { date: "2026-02-10", newClients: 2500, existingClients: 2000 },
  { date: "2026-02-11", newClients: 3000, existingClients: 1500 },
  { date: "2026-02-12", newClients: 2000, existingClients: 2500 },
  { date: "2026-02-13", newClients: 4500, existingClients: 4000 },
  { date: "2026-02-14", newClients: 5000, existingClients: 5000 },
  { date: "2026-02-15", newClients: 6000, existingClients: 4500 },
  { date: "2026-02-16", newClients: 3500, existingClients: 3000 }
];



/* =========================
   🔥 DATA COMMISSION
========================= */

// const commissionData = [
//   // Febrero 2026
//   { date: "2026-02-16", newPending: 150.00, newPaid: 0, newCancelled: 0, existingPending: 80.00, existingPaid: 0, existingCancelled: 0 },
//   { date: "2026-02-15", newPending: 230.00, newPaid: 89.00, newCancelled: 0, existingPending: 0, existingPaid: 120.00, existingCancelled: 0 },
//   { date: "2026-02-14", newPending: 0, newPaid: 320.00, newCancelled: 45.00, existingPending: 95.00, existingPaid: 180.00, existingCancelled: 0 },
//   { date: "2026-02-13", newPending: 180.00, newPaid: 0, newCancelled: 0, existingPending: 0, existingPaid: 250.00, existingCancelled: 35.00 },
//   { date: "2026-02-12", newPending: 0, newPaid: 210.00, newCancelled: 0, existingPending: 110.00, existingPaid: 0, existingCancelled: 0 },
//   { date: "2026-02-11", newPending: 75.00, newPaid: 120.00, newCancelled: 0, existingPending: 0, existingPaid: 190.00, existingCancelled: 0 },
//   { date: "2026-02-10", newPending: 0, newPaid: 98.00, newCancelled: 35.00, existingPending: 65.00, existingPaid: 0, existingCancelled: 25.00 },
//   { date: "2026-02-09", newPending: 110.00, newPaid: 0, newCancelled: 0, existingPending: 0, existingPaid: 145.00, existingCancelled: 0 },
//   { date: "2026-02-08", newPending: 0, newPaid: 185.00, newCancelled: 0, existingPending: 85.00, existingPaid: 0, existingCancelled: 0 },
//   { date: "2026-02-07", newPending: 95.00, newPaid: 140.00, newCancelled: 0, existingPending: 0, existingPaid: 210.00, existingCancelled: 40.00 },
  
//   // Enero 2026
//   { date: "2026-01-28", newPending: 0, newPaid: 350.00, newCancelled: 0, existingPending: 0, existingPaid: 280.00, existingCancelled: 0 },
//   { date: "2026-01-25", newPending: 0, newPaid: 190.00, newCancelled: 55.00, existingPending: 0, existingPaid: 220.00, existingCancelled: 30.00 },
//   { date: "2026-01-20", newPending: 0, newPaid: 280.00, newCancelled: 0, existingPending: 0, existingPaid: 310.00, existingCancelled: 0 },
//   { date: "2026-01-15", newPending: 0, newPaid: 110.00, newCancelled: 0, existingPending: 0, existingPaid: 150.00, existingCancelled: 45.00 },
//   { date: "2026-01-10", newPending: 0, newPaid: 420.00, newCancelled: 0, existingPending: 0, existingPaid: 380.00, existingCancelled: 0 },
//   { date: "2026-01-05", newPending: 0, newPaid: 67.00, newCancelled: 25.00, existingPending: 0, existingPaid: 95.00, existingCancelled: 0 },
  
//   // Diciembre 2025
//   { date: "2025-12-28", newPending: 0, newPaid: 520.00, newCancelled: 0, existingPending: 0, existingPaid: 410.00, existingCancelled: 0 },
//   { date: "2025-12-22", newPending: 0, newPaid: 310.00, newCancelled: 0, existingPending: 0, existingPaid: 265.00, existingCancelled: 35.00 },
//   { date: "2025-12-18", newPending: 0, newPaid: 0, newCancelled: 89.00, existingPending: 0, existingPaid: 180.00, existingCancelled: 0 },
//   { date: "2025-12-15", newPending: 0, newPaid: 240.00, newCancelled: 0, existingPending: 0, existingPaid: 195.00, existingCancelled: 0 },
//   { date: "2025-12-10", newPending: 0, newPaid: 175.00, newCancelled: 0, existingPending: 0, existingPaid: 140.00, existingCancelled: 25.00 },
//   { date: "2025-12-05", newPending: 0, newPaid: 380.00, newCancelled: 45.00, existingPending: 0, existingPaid: 290.00, existingCancelled: 0 },
  
//   // Noviembre 2025
//   { date: "2025-11-25", newPending: 0, newPaid: 220.00, newCancelled: 0, existingPending: 0, existingPaid: 185.00, existingCancelled: 0 },
//   { date: "2025-11-20", newPending: 0, newPaid: 140.00, newCancelled: 0, existingPending: 0, existingPaid: 120.00, existingCancelled: 30.00 },
//   { date: "2025-11-15", newPending: 0, newPaid: 0, newCancelled: 95.00, existingPending: 0, existingPaid: 0, existingCancelled: 40.00 },
//   { date: "2025-11-10", newPending: 0, newPaid: 330.00, newCancelled: 0, existingPending: 0, existingPaid: 275.00, existingCancelled: 0 },
//   { date: "2025-11-05", newPending: 0, newPaid: 185.00, newCancelled: 0, existingPending: 0, existingPaid: 150.00, existingCancelled: 0 },
  
//   // Octubre 2025
//   { date: "2025-10-28", newPending: 0, newPaid: 290.00, newCancelled: 0, existingPending: 0, existingPaid: 240.00, existingCancelled: 0 },
//   { date: "2025-10-22", newPending: 0, newPaid: 160.00, newCancelled: 0, existingPending: 0, existingPaid: 130.00, existingCancelled: 25.00 },
//   { date: "2025-10-15", newPending: 0, newPaid: 0, newCancelled: 78.00, existingPending: 0, existingPaid: 0, existingCancelled: 35.00 },
//   { date: "2025-10-10", newPending: 0, newPaid: 410.00, newCancelled: 0, existingPending: 0, existingPaid: 350.00, existingCancelled: 0 },
//   { date: "2025-10-05", newPending: 0, newPaid: 235.00, newCancelled: 0, existingPending: 0, existingPaid: 190.00, existingCancelled: 0 },
  
//   // Septiembre 2025
//   { date: "2025-09-25", newPending: 0, newPaid: 195.00, newCancelled: 0, existingPending: 0, existingPaid: 160.00, existingCancelled: 0 },
//   { date: "2025-09-20", newPending: 0, newPaid: 360.00, newCancelled: 0, existingPending: 0, existingPaid: 295.00, existingCancelled: 20.00 },
//   { date: "2025-09-15", newPending: 0, newPaid: 125.00, newCancelled: 0, existingPending: 0, existingPaid: 100.00, existingCancelled: 0 },
//   { date: "2025-09-10", newPending: 0, newPaid: 0, newCancelled: 89.00, existingPending: 0, existingPaid: 0, existingCancelled: 45.00 },
//   { date: "2025-09-05", newPending: 0, newPaid: 270.00, newCancelled: 0, existingPending: 0, existingPaid: 220.00, existingCancelled: 0 },
  
//   // Agosto 2025
//   { date: "2025-08-28", newPending: 0, newPaid: 450.00, newCancelled: 0, existingPending: 0, existingPaid: 380.00, existingCancelled: 0 },
//   { date: "2025-08-22", newPending: 0, newPaid: 210.00, newCancelled: 0, existingPending: 0, existingPaid: 175.00, existingCancelled: 30.00 },
//   { date: "2025-08-15", newPending: 0, newPaid: 170.00, newCancelled: 0, existingPending: 0, existingPaid: 140.00, existingCancelled: 0 },
//   { date: "2025-08-10", newPending: 0, newPaid: 320.00, newCancelled: 0, existingPending: 0, existingPaid: 265.00, existingCancelled: 0 },
//   { date: "2025-08-05", newPending: 0, newPaid: 0, newCancelled: 98.00, existingPending: 0, existingPaid: 0, existingCancelled: 55.00 },
  
//   // Julio 2025
//   { date: "2025-07-25", newPending: 0, newPaid: 280.00, newCancelled: 0, existingPending: 0, existingPaid: 230.00, existingCancelled: 0 },
//   { date: "2025-07-20", newPending: 0, newPaid: 150.00, newCancelled: 0, existingPending: 0, existingPaid: 125.00, existingCancelled: 25.00 },
//   { date: "2025-07-15", newPending: 0, newPaid: 390.00, newCancelled: 0, existingPending: 0, existingPaid: 320.00, existingCancelled: 0 },
//   { date: "2025-07-10", newPending: 0, newPaid: 110.00, newCancelled: 0, existingPending: 0, existingPaid: 90.00, existingCancelled: 0 },
//   { date: "2025-07-05", newPending: 0, newPaid: 0, newCancelled: 65.00, existingPending: 0, existingPaid: 0, existingCancelled: 40.00 },
  
//   // Junio 2025
//   { date: "2025-06-28", newPending: 0, newPaid: 240.00, newCancelled: 0, existingPending: 0, existingPaid: 195.00, existingCancelled: 0 },
//   { date: "2025-06-22", newPending: 0, newPaid: 185.00, newCancelled: 0, existingPending: 0, existingPaid: 150.00, existingCancelled: 20.00 },
//   { date: "2025-06-15", newPending: 0, newPaid: 310.00, newCancelled: 0, existingPending: 0, existingPaid: 255.00, existingCancelled: 0 },
//   { date: "2025-06-10", newPending: 0, newPaid: 92.00, newCancelled: 0, existingPending: 0, existingPaid: 75.00, existingCancelled: 0 },
//   { date: "2025-06-05", newPending: 0, newPaid: 140.00, newCancelled: 35.00, existingPending: 0, existingPaid: 115.00, existingCancelled: 0 },
  
//   // Mayo 2025
//   { date: "2025-05-25", newPending: 0, newPaid: 265.00, newCancelled: 0, existingPending: 0, existingPaid: 215.00, existingCancelled: 0 },
//   { date: "2025-05-20", newPending: 0, newPaid: 130.00, newCancelled: 0, existingPending: 0, existingPaid: 105.00, existingCancelled: 25.00 },
//   { date: "2025-05-15", newPending: 0, newPaid: 420.00, newCancelled: 0, existingPending: 0, existingPaid: 345.00, existingCancelled: 0 },
//   { date: "2025-05-10", newPending: 0, newPaid: 0, newCancelled: 78.00, existingPending: 0, existingPaid: 0, existingCancelled: 45.00 },
//   { date: "2025-05-05", newPending: 0, newPaid: 195.00, newCancelled: 0, existingPending: 0, existingPaid: 160.00, existingCancelled: 0 },
  
//   // Abril 2025
//   { date: "2025-04-28", newPending: 0, newPaid: 370.00, newCancelled: 0, existingPending: 0, existingPaid: 305.00, existingCancelled: 0 },
//   { date: "2025-04-22", newPending: 0, newPaid: 220.00, newCancelled: 0, existingPending: 0, existingPaid: 180.00, existingCancelled: 30.00 },
//   { date: "2025-04-15", newPending: 0, newPaid: 160.00, newCancelled: 0, existingPending: 0, existingPaid: 130.00, existingCancelled: 0 },
//   { date: "2025-04-10", newPending: 0, newPaid: 89.00, newCancelled: 0, existingPending: 0, existingPaid: 72.00, existingCancelled: 0 },
//   { date: "2025-04-05", newPending: 0, newPaid: 290.00, newCancelled: 42.00, existingPending: 0, existingPaid: 240.00, existingCancelled: 0 },
  
//   // Marzo 2025
//   { date: "2025-03-25", newPending: 0, newPaid: 145.00, newCancelled: 0, existingPending: 0, existingPaid: 120.00, existingCancelled: 0 },
//   { date: "2025-03-20", newPending: 0, newPaid: 340.00, newCancelled: 0, existingPending: 0, existingPaid: 280.00, existingCancelled: 25.00 },
//   { date: "2025-03-15", newPending: 0, newPaid: 210.00, newCancelled: 0, existingPending: 0, existingPaid: 170.00, existingCancelled: 0 },
//   { date: "2025-03-10", newPending: 0, newPaid: 0, newCancelled: 56.00, existingPending: 0, existingPaid: 0, existingCancelled: 35.00 },
//   { date: "2025-03-05", newPending: 0, newPaid: 180.00, newCancelled: 0, existingPending: 0, existingPaid: 145.00, existingCancelled: 0 },
  
//   // Febrero 2025
//   { date: "2025-02-25", newPending: 0, newPaid: 250.00, newCancelled: 0, existingPending: 0, existingPaid: 205.00, existingCancelled: 0 },
//   { date: "2025-02-20", newPending: 0, newPaid: 175.00, newCancelled: 0, existingPending: 0, existingPaid: 140.00, existingCancelled: 20.00 },
//   { date: "2025-02-15", newPending: 0, newPaid: 300.00, newCancelled: 0, existingPending: 0, existingPaid: 245.00, existingCancelled: 0 },
//   { date: "2025-02-10", newPending: 0, newPaid: 92.00, newCancelled: 0, existingPending: 0, existingPaid: 75.00, existingCancelled: 0 },
//   { date: "2025-02-05", newPending: 0, newPaid: 135.00, newCancelled: 38.00, existingPending: 0, existingPaid: 110.00, existingCancelled: 0 }
// ];


/* =========================
   🔥 DATA - COMMISSION (10% de ventas + pagos y cancelaciones)
   Commission Rate = 10%
========================= */

const commissionData = [
  // Febrero 2025 - Comisiones = 10% de ventas
  // New: 2500 * 10% = 250, Existing: 1500 * 10% = 150
  { date: "2025-02-01", newCommission: 250, existingCommission: 150, paid: 300, cancelled: 0 },
  
  // Marzo 2025 - New: 3500 * 10% = 350, Existing: 2500 * 10% = 250
  { date: "2025-03-01", newCommission: 350, existingCommission: 250, paid: 400, cancelled: 50 },
  
  // Abril 2025 - New: 7500 * 10% = 750, Existing: 5000 * 10% = 500
  { date: "2025-04-01", newCommission: 750, existingCommission: 500, paid: 1000, cancelled: 0 },
  
  // Mayo 2025 - New: 4500 * 10% = 450, Existing: 4000 * 10% = 400
  { date: "2025-05-01", newCommission: 450, existingCommission: 400, paid: 600, cancelled: 50 },
  
  // Junio 2025 - New: 7000 * 10% = 700, Existing: 5500 * 10% = 550
  { date: "2025-06-01", newCommission: 700, existingCommission: 550, paid: 1000, cancelled: 0 },
  
  // Julio 2025 - New: 3000 * 10% = 300, Existing: 2000 * 10% = 200
  { date: "2025-07-01", newCommission: 300, existingCommission: 200, paid: 400, cancelled: 50 },
  
  // Agosto 2025 - New: 5500 * 10% = 550, Existing: 4500 * 10% = 450
  { date: "2025-08-01", newCommission: 550, existingCommission: 450, paid: 800, cancelled: 0 },
  
  // Septiembre 2025 - New: 1000 * 10% = 100, Existing: 2000 * 10% = 200
  { date: "2025-09-01", newCommission: 100, existingCommission: 200, paid: 200, cancelled: 50 },
  
  // Octubre 2025 - New: 500 * 10% = 50, Existing: 2500 * 10% = 250
  { date: "2025-10-01", newCommission: 50, existingCommission: 250, paid: 200, cancelled: 0 },
  
  // Noviembre 2025 - New: 2500 * 10% = 250, Existing: 2500 * 10% = 250
  { date: "2025-11-01", newCommission: 250, existingCommission: 250, paid: 400, cancelled: 0 },
  
  // Diciembre 2025 - New: 5000 * 10% = 500, Existing: 3000 * 10% = 300
  { date: "2025-12-01", newCommission: 500, existingCommission: 300, paid: 600, cancelled: 50 },
  
  // Enero 2026 - New: 4000 * 10% = 400, Existing: 3500 * 10% = 350
  { date: "2026-01-01", newCommission: 400, existingCommission: 350, paid: 500, cancelled: 0 },
  
  // Febrero 2026 (datos diarios)
  { date: "2026-02-07", newCommission: 150, existingCommission: 100, paid: 100, cancelled: 0 },
  { date: "2026-02-08", newCommission: 200, existingCommission: 150, paid: 150, cancelled: 0 },
  { date: "2026-02-09", newCommission: 100, existingCommission: 50, paid: 50, cancelled: 0 },
  { date: "2026-02-10", newCommission: 250, existingCommission: 200, paid: 200, cancelled: 50 },
  { date: "2026-02-11", newCommission: 300, existingCommission: 150, paid: 200, cancelled: 0 },
  { date: "2026-02-12", newCommission: 200, existingCommission: 250, paid: 300, cancelled: 0 },
  { date: "2026-02-13", newCommission: 450, existingCommission: 400, paid: 500, cancelled: 0 },
  { date: "2026-02-14", newCommission: 500, existingCommission: 500, paid: 600, cancelled: 50 },
  { date: "2026-02-15", newCommission: 600, existingCommission: 450, paid: 700, cancelled: 0 },
  { date: "2026-02-16", newCommission: 350, existingCommission: 300, paid: 400, cancelled: 0 }
];


/* =========================
   🔥 DATA DE TRANSACCIONES DETALLADAS
========================= */

const transactionsData = [
  // Febrero 2026
  { date: "2026-02-16", orderNumber: "ORD-2026-0216", totalSales: 4000.00, commissionRate: 10, commission: 400.00, status: "paid" },
  { date: "2026-02-15", orderNumber: "ORD-2026-0215", totalSales: 7000.00, commissionRate: 10, commission: 700.00, status: "paid" },
  { date: "2026-02-14", orderNumber: "ORD-2026-0214", totalSales: 6500.00, commissionRate: 10, commission: 650.00, status: "paid" },
  { date: "2026-02-14", orderNumber: "ORD-2026-0214B", totalSales: 500.00, commissionRate: 10, commission: 50.00, status: "declined" },
  { date: "2026-02-13", orderNumber: "ORD-2026-0213", totalSales: 5000.00, commissionRate: 10, commission: 500.00, status: "paid" },
  { date: "2026-02-12", orderNumber: "ORD-2026-0212", totalSales: 3000.00, commissionRate: 10, commission: 300.00, status: "paid" },
  { date: "2026-02-11", orderNumber: "ORD-2026-0211", totalSales: 2000.00, commissionRate: 10, commission: 200.00, status: "paid" },
  { date: "2026-02-10", orderNumber: "ORD-2026-0210", totalSales: 2000.00, commissionRate: 10, commission: 200.00, status: "paid" },
  { date: "2026-02-10", orderNumber: "ORD-2026-0210B", totalSales: 500.00, commissionRate: 10, commission: 50.00, status: "declined" },
  { date: "2026-02-09", orderNumber: "ORD-2026-0209", totalSales: 500.00, commissionRate: 10, commission: 50.00, status: "paid" },
  
  // Enero 2026
  { date: "2026-01-28", orderNumber: "ORD-2026-0128", totalSales: 2000.00, commissionRate: 10, commission: 200.00, status: "paid" },
  { date: "2026-01-25", orderNumber: "ORD-2026-0125", totalSales: 1500.00, commissionRate: 10, commission: 150.00, status: "paid" },
  { date: "2026-01-20", orderNumber: "ORD-2026-0120", totalSales: 1000.00, commissionRate: 10, commission: 100.00, status: "paid" },
  { date: "2026-01-15", orderNumber: "ORD-2026-0115", totalSales: 500.00, commissionRate: 10, commission: 50.00, status: "paid" },
  
  // Diciembre 2025
  { date: "2025-12-28", orderNumber: "ORD-2025-1228", totalSales: 3000.00, commissionRate: 10, commission: 300.00, status: "paid" },
  { date: "2025-12-22", orderNumber: "ORD-2025-1222", totalSales: 2000.00, commissionRate: 10, commission: 200.00, status: "paid" },
  { date: "2025-12-22", orderNumber: "ORD-2025-1222B", totalSales: 500.00, commissionRate: 10, commission: 50.00, status: "declined" },
  { date: "2025-12-15", orderNumber: "ORD-2025-1215", totalSales: 1000.00, commissionRate: 10, commission: 100.00, status: "paid" },
  
  // Noviembre 2025
  { date: "2025-11-25", orderNumber: "ORD-2025-1125", totalSales: 2000.00, commissionRate: 10, commission: 200.00, status: "paid" },
  { date: "2025-11-20", orderNumber: "ORD-2025-1120", totalSales: 1500.00, commissionRate: 10, commission: 150.00, status: "paid" },
  { date: "2025-11-15", orderNumber: "ORD-2025-1115", totalSales: 500.00, commissionRate: 10, commission: 50.00, status: "paid" },
  
  // Octubre 2025
  { date: "2025-10-28", orderNumber: "ORD-2025-1028", totalSales: 1000.00, commissionRate: 10, commission: 100.00, status: "paid" },
  { date: "2025-10-20", orderNumber: "ORD-2025-1020", totalSales: 1000.00, commissionRate: 10, commission: 100.00, status: "paid" },
  
  // Septiembre 2025
  { date: "2025-09-25", orderNumber: "ORD-2025-0925", totalSales: 1500.00, commissionRate: 10, commission: 150.00, status: "paid" },
  { date: "2025-09-15", orderNumber: "ORD-2025-0915", totalSales: 500.00, commissionRate: 10, commission: 50.00, status: "paid" },
  
  // Agosto 2025
  { date: "2025-08-28", orderNumber: "ORD-2025-0828", totalSales: 5000.00, commissionRate: 10, commission: 500.00, status: "paid" },
  { date: "2025-08-20", orderNumber: "ORD-2025-0820", totalSales: 3000.00, commissionRate: 10, commission: 300.00, status: "paid" },
  
  // Julio 2025
  { date: "2025-07-25", orderNumber: "ORD-2025-0725", totalSales: 5000.00, commissionRate: 10, commission: 500.00, status: "paid" },
  { date: "2025-07-15", orderNumber: "ORD-2025-0715", totalSales: 4000.00, commissionRate: 10, commission: 400.00, status: "paid" },
  
  // Junio 2025
  { date: "2025-06-28", orderNumber: "ORD-2025-0628", totalSales: 5000.00, commissionRate: 10, commission: 500.00, status: "paid" },
  { date: "2025-06-15", orderNumber: "ORD-2025-0615", totalSales: 4500.00, commissionRate: 10, commission: 450.00, status: "paid" },
  
  // Mayo 2025
  { date: "2025-05-25", orderNumber: "ORD-2025-0525", totalSales: 5000.00, commissionRate: 10, commission: 500.00, status: "paid" },
  { date: "2025-05-15", orderNumber: "ORD-2025-0515", totalSales: 3250.00, commissionRate: 10, commission: 325.00, status: "paid" },
  
  // Abril 2025
  { date: "2025-04-28", orderNumber: "ORD-2025-0428", totalSales: 5000.00, commissionRate: 10, commission: 500.00, status: "paid" },
  { date: "2025-04-15", orderNumber: "ORD-2025-0415", totalSales: 4270.00, commissionRate: 10, commission: 427.00, status: "paid" },
  
  // Marzo 2025
  { date: "2025-03-25", orderNumber: "ORD-2025-0325", totalSales: 4000.00, commissionRate: 10, commission: 400.00, status: "paid" },
  { date: "2025-03-15", orderNumber: "ORD-2025-0315", totalSales: 4750.00, commissionRate: 10, commission: 475.00, status: "paid" },
  
  // Febrero 2025
  { date: "2025-02-25", orderNumber: "ORD-2025-0225", totalSales: 2500.00, commissionRate: 10, commission: 250.00, status: "paid" },
  { date: "2025-02-15", orderNumber: "ORD-2025-0215", totalSales: 2250.00, commissionRate: 10, commission: 225.00, status: "paid" }
>>>>>>> c10c9a3d80c9b285c61c48beeb028ec2ec3391c2
];