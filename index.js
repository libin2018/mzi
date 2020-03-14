const puppeteer = require('puppeteer');
const fs = require('fs');
const program = require('commander');
let begIndex = 1;
let endIndex = 242;
let curTotal = 0;

function range(val) {
    return val.split('..').map(Number);
}

function list(val) {
    return val.split(',')
}

program
    .version('0.0.1')
    .usage('[options] [value ...]')
    .option('-m, --message <string>', 'a string argument')
    .option('-i, --integer <n>', 'input a integet argument.', parseInt)
    .option('-f, --float <f>', 'input a float arg', parseFloat)
    .option('-l, --list <items>', 'a list', list)
    .option('-r, --range <a>..<b>', 'a range', range)

program.on('help', function () {
    console.log('   Examples:')
    console.log('')
    console.log('       # input string, integer and float')
    console.log('       $ ./nodecmd.js -m \"a string\" -i 1 -f 1.01')
    console.log('')

    console.log('       # input range 1 - 3')
    console.log('       $ ./nodecmd.js -r 1..3')
    console.log('')

    console.log('       # input list: [1,2,3]')
    console.log('       $ ./nodecmd.js -l 1,2,3')
    console.log('')
});

program.parse(process.argv)

async function start() {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>beg>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

    if (program.list != null && program.list.length == 2) {
        begIndex = program.list[0];
        endIndex = program.list[1];
    }

    console.log('crawl page index -> ' + begIndex + ' to ' + endIndex);

    let begDate = new Date();

    let detailUrls = await getDetailUrls();

    if (detailUrls == null) {
        return;
    }

    curTotal = detailUrls.length;

    console.log('pictures page total:' + curTotal);

    for (let i = 0; i < curTotal; i++) {
        let tempDate = new Date();
        console.log('crawl page index -> ' + (i + 1) + '/' + curTotal);
        let detailUrl = detailUrls[i];
        let info = await getInfo(detailUrl);
        if (info == null) continue;
        await getImages(i, detailUrl, info);
        let ms = new Date().getTime() - tempDate.getTime();
        console.log('execution time:' + Math.round(ms / 1000 / 60 * 100) / 100 + ' min');
    }
    let allms = new Date().getTime() - begDate.getTime();
    console.log('execution all time:' + Math.round(allms / 1000 / 60 * 100) / 100 + ' min');
    console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<end<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
}

async function getImages(index, detailUrl, info) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    let folder = info.split('|')[0];
    let total = info.split('|')[1];

    fs.mkdir('./img/' + folder, function (error) {
        if (error) {
            return false;
        }
    });

    for (var j = 1; j <= total; j++) {
        let imgUrl = detailUrl + '/' + j;
        let filePath = './img/' + folder + '/' + j + '.jpg';
        let msg = 'index:(' + (index + 1) + '/' + curTotal + ') -> img:(' + j + '/' + total + ') -> ' + imgUrl + ' -> ';
        let exists = fs.existsSync(filePath);

        if (exists) {
            console.log(msg + 'pictures exists');
            continue;
        }
        try {
            await page.goto(imgUrl);

            let clip = await page.evaluate(() => {
                let { x, y, width, height } = document.querySelectorAll('.main-image img')[0].getBoundingClientRect();
                return { x, y, width, height };
            });
            if (clip.height < 100) {
                console.log(msg + 'pictures small');
                continue;
            }
            await page.screenshot({
                path: filePath,
                clip: clip
            });
            console.log(msg + 'pictures success');
        } catch (e) {
            console.log(msg + 'pictures error ' + e);
        }
    }

    browser.close();
}

async function getInfo(url) {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        let info = await page.evaluate(() => {
            let folder = [...document.querySelectorAll('.main-title')][0].innerHTML;
            let total = [...document.querySelectorAll('.pagenavi a span')][4].innerHTML;
            return folder + '|' + total;
        });
        browser.close();
        console.log(url + ' -> pictures info ' + info);
        return info;
    } catch (e) {
        console.log(url + ' -> pictures info error ' + e);
        return null;
    }
}

async function getDetailUrls() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    let detailUrls = [];

    for (let i = begIndex; i <= endIndex; i++) {
        let url = 'https://www.mzitu.com/page/' + i;
        console.log('Start to crawl girl\'s pictures page -> ' + url);

        try {
            await page.goto(url);

            let tempUrls = await page.evaluate(() => {
                let tempUrls = []
                let list = [...document.querySelectorAll('#pins li span a')];
                list.forEach(e => {
                    if (e.href.indexOf('https://www.mzitu.com') != -1) {
                        tempUrls.push(e.href)
                    }
                });
                return tempUrls;
            });
            detailUrls = detailUrls.concat(tempUrls);
        } catch (e) {
            console.log('get pictures urls error ' + e);
            continue;
        }
    }

    browser.close();

    return detailUrls;
}

start();