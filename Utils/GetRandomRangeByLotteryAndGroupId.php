<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$lotteryId = isset($_GET['lotteryId']) ? intval($_GET['lotteryId']) : 0;
$lotteryGroupId = isset($_GET['lotteryGroupId']) ? intval($_GET['lotteryGroupId']) : 3;

// Generate random numbers based on lottery group
$lotteryPrizeRanges = array();
$numberprovince = 2; // MT has 2 provinces

// Giải 8 (2 số) - 2 tỉnh
for ($i = 0; $i < $numberprovince; $i++) {
    $lotteryPrizeRanges[] = str_pad(rand(10, 99), 2, '0', STR_PAD_LEFT);
}

// Giải 7 (3 số) - 2 tỉnh
for ($i = 0; $i < $numberprovince; $i++) {
    $lotteryPrizeRanges[] = str_pad(rand(100, 999), 3, '0', STR_PAD_LEFT);
}

// Giải 6 (4 số, 3 kết quả) - 2 tỉnh
for ($i = 0; $i < $numberprovince; $i++) {
    for ($j = 0; $j < 3; $j++) {
        $lotteryPrizeRanges[] = str_pad(rand(1000, 9999), 4, '0', STR_PAD_LEFT);
    }
}

// Giải 5 (4 số) - 2 tỉnh
for ($i = 0; $i < $numberprovince; $i++) {
    $lotteryPrizeRanges[] = str_pad(rand(1000, 9999), 4, '0', STR_PAD_LEFT);
}

// Giải 4 (5 số, 7 kết quả) - 2 tỉnh
for ($i = 0; $i < $numberprovince; $i++) {
    for ($j = 0; $j < 7; $j++) {
        $lotteryPrizeRanges[] = str_pad(rand(10000, 99999), 5, '0', STR_PAD_LEFT);
    }
}

// Giải 3 (5 số, 2 kết quả) - 2 tỉnh
for ($i = 0; $i < $numberprovince; $i++) {
    for ($j = 0; $j < 2; $j++) {
        $lotteryPrizeRanges[] = str_pad(rand(10000, 99999), 5, '0', STR_PAD_LEFT);
    }
}

// Giải 2 (5 số) - 2 tỉnh
for ($i = 0; $i < $numberprovince; $i++) {
    $lotteryPrizeRanges[] = str_pad(rand(10000, 99999), 5, '0', STR_PAD_LEFT);
}

// Giải 1 (5 số) - 2 tỉnh
for ($i = 0; $i < $numberprovince; $i++) {
    $lotteryPrizeRanges[] = str_pad(rand(10000, 99999), 5, '0', STR_PAD_LEFT);
}

// Giải ĐB (6 số) - 2 tỉnh
for ($i = 0; $i < $numberprovince; $i++) {
    $lotteryPrizeRanges[] = str_pad(rand(100000, 999999), 6, '0', STR_PAD_LEFT);
}

$today = date('d-m-Y');

$response = array(
    'lotteryPrizeRanges' => $lotteryPrizeRanges,
    'openPrize' => $today
);

echo json_encode($response);
?>

