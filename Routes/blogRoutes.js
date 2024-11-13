const { model } = require('mongoose');
const { submitBlog, approveBlog, getpendingBlog, rejectBlog, getApprovedBlogs, getBlogById } = require('../Controllers/blogController');
const { isBlogger, isAdmin, verifyToken } = require('../Middlewares/middleware');
const express = require('express');
const router = express.Router();
const ratelimit = require('express-rate-limit');
const multer = require('multer');
const path = require('path');

// Defining the rate limit for all the routes in this router
const limiter = ratelimit({
    windowMs: 15 * 60 * 100,
    max: 100,
    message: {
        status: 429,
        message: 'To many requests, please try again later.'
    }
});
// Applying the rate limit on all the routes in this router
// router.use(limiter);


// Blogger route to submit blog for approval
router.post('/submit' , submitBlog);

// Admin Route to get all pending blogs for approval
router.get('/pending', verifyToken, isAdmin ,getpendingBlog);

// Admin route to Approve blog
router.post('/approve', verifyToken, isAdmin,approveBlog);

// Admin Route to Reject blog 
router.post('/reject', verifyToken, isAdmin, rejectBlog);

// Admin and Client route to get all Approved Blogs
router.get('/blogs', getApprovedBlogs);

// Client Route to get Approved blog by Id
router.get('/blogs/:id', getBlogById);

module.exports = router;

