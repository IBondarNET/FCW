<?php
$data = json_decode(file_get_contents('php://input'), true);
$number = $data['number'];
$product1 = $data['products']['product1'];
$product2 = $data['products']['product2'];

$response = "OK";
$total = ($product1 + $product2) * 10;

if ($product1 > 5 || $product2 > 5) {
    $response = "Too much of ";
    $exceededFields = [];
    if ($product1 > 5) {
        $exceededFields[] = "product1";
    }
    if ($product2 > 5) {
        $exceededFields[] = "product2";
    }
    $response .= implode(", ", $exceededFields);
}

$result = [
    "response" => $response,
    "products" => [
        "product1" => $product1,
        "product2" => $product2
    ],
    "total" => $total
];

header("Content-Type: application/json");
echo json_encode($result);
?>
