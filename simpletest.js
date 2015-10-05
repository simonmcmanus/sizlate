var cheerio = require('cheerio');
var $page = cheerio.load('<div></div>');
$page('div').text('bacon');
console.log($page.html());
