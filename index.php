<?php
// رابط Google Apps Script API
$googleSheetsUrl = "https://docs.google.com/spreadsheets/d/1DRIHqy8JHSX6nQixWQFsnhdnpBLFptU0XpABpEr4gUs/edit?gid=0";

// جلب البيانات من Google Sheets
$response = file_get_contents($googleSheetsUrl);
$data = json_decode($response, true);
?>

<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>عرض البيانات من Google Sheets</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; }
        table { width: 80%; margin: 20px auto; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 10px; }
        th { background-color: #4CAF50; color: white; }
    </style>
</head>
<body>
    <h2>بيانات من Google Sheets</h2>
    <table>
        <tr>
            <?php if (!empty($data)): ?>
                <?php foreach (array_keys($data[0]) as $key): ?>
                    <th><?php echo htmlspecialchars($key); ?></th>
                <?php endforeach; ?>
            <?php endif; ?>
        </tr>
        <?php foreach ($data as $row): ?>
            <tr>
                <?php foreach ($row as $cell): ?>
                    <td><?php echo htmlspecialchars($cell); ?></td>
                <?php endforeach; ?>
            </tr>
        <?php endforeach; ?>
    </table>
</body>
</html>
