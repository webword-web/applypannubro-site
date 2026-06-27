const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  getOrders,
  updateOrderStatus,
  downloadInvoice,
  getDashboardMetrics,
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(createOrder)
  .get(protect, getOrders);

router.get('/dashboard/metrics', protect, getDashboardMetrics);

router.route('/:id')
  .get(getOrderById);

router.put('/:id/pay', updateOrderToPaid);
router.put('/:id/status', protect, updateOrderStatus);
router.get('/:id/invoice', downloadInvoice);

module.exports = router;
