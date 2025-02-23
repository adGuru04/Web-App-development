exports.get404 = (req, res, next) => {
  res.status(404) // ❌ Set HTTP status to 404 (Not Found)
     .render('404', { 
        pageTitle: 'Page Not Found', // 📄 Set page title
        path: '/404' // 🔍 Path for highlighting active links in navigation
     });
};
