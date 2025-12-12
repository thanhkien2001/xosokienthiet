// Simple Node.js server endpoint (if using Node.js)
// Usage: node GetRandomRangeByLotteryAndGroupId.js
// Then access: http://localhost:8000/Utils/GetRandomRangeByLotteryAndGroupId?lotteryId=0&lotteryGroupId=3

const http = require('http');
const url = require('url');

function generateRandomNumbers(lotteryGroupId) {
    const lotteryPrizeRanges = [];
    const numberprovince = 2; // MT has 2 provinces

    // Giải 8 (2 số) - 2 tỉnh
    for (let i = 0; i < numberprovince; i++) {
        lotteryPrizeRanges.push(String(Math.floor(Math.random() * 90 + 10)).padStart(2, '0'));
    }

    // Giải 7 (3 số) - 2 tỉnh
    for (let i = 0; i < numberprovince; i++) {
        lotteryPrizeRanges.push(String(Math.floor(Math.random() * 900 + 100)).padStart(3, '0'));
    }

    // Giải 6 (4 số, 3 kết quả) - 2 tỉnh
    for (let i = 0; i < numberprovince; i++) {
        for (let j = 0; j < 3; j++) {
            lotteryPrizeRanges.push(String(Math.floor(Math.random() * 9000 + 1000)).padStart(4, '0'));
        }
    }

    // Giải 5 (4 số) - 2 tỉnh
    for (let i = 0; i < numberprovince; i++) {
        lotteryPrizeRanges.push(String(Math.floor(Math.random() * 9000 + 1000)).padStart(4, '0'));
    }

    // Giải 4 (5 số, 7 kết quả) - 2 tỉnh
    for (let i = 0; i < numberprovince; i++) {
        for (let j = 0; j < 7; j++) {
            lotteryPrizeRanges.push(String(Math.floor(Math.random() * 90000 + 10000)).padStart(5, '0'));
        }
    }

    // Giải 3 (5 số, 2 kết quả) - 2 tỉnh
    for (let i = 0; i < numberprovince; i++) {
        for (let j = 0; j < 2; j++) {
            lotteryPrizeRanges.push(String(Math.floor(Math.random() * 90000 + 10000)).padStart(5, '0'));
        }
    }

    // Giải 2 (5 số) - 2 tỉnh
    for (let i = 0; i < numberprovince; i++) {
        lotteryPrizeRanges.push(String(Math.floor(Math.random() * 90000 + 10000)).padStart(5, '0'));
    }

    // Giải 1 (5 số) - 2 tỉnh
    for (let i = 0; i < numberprovince; i++) {
        lotteryPrizeRanges.push(String(Math.floor(Math.random() * 90000 + 10000)).padStart(5, '0'));
    }

    // Giải ĐB (6 số) - 2 tỉnh
    for (let i = 0; i < numberprovince; i++) {
        lotteryPrizeRanges.push(String(Math.floor(Math.random() * 900000 + 100000)).padStart(6, '0'));
    }

    return lotteryPrizeRanges;
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    
    if (parsedUrl.pathname === '/Utils/GetRandomRangeByLotteryAndGroupId') {
        const lotteryId = parseInt(parsedUrl.query.lotteryId) || 0;
        const lotteryGroupId = parseInt(parsedUrl.query.lotteryGroupId) || 3;
        
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        const dateStr = `${day}-${month}-${year}`;
        
        const response = {
            lotteryPrizeRanges: generateRandomNumbers(lotteryGroupId),
            openPrize: dateStr
        };
        
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify(response));
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

