<?php
require __DIR__ . "/vendor/autoload.php";

$faker = Faker\Factory::create();

?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Map services app</title>
    </head>
    <body>
        <div class="container">
            <!-- the map service container -->
            <div id="map" class="map"></div>
            
            <!-- list container -->
            <div class="list">
                <?php for ($i = 0; $i < 30; $i++): ?>
                    <div class="item" data-lng="<?= $faker->longitude ?>" data-lat="<?= $faker->latitude ?>" data-name="<?= $faker->name ?>">
                        <?= $faker->name ?>
                    </div>
                <?php endfor; ?>
            </div>
        </div>
    </body>
</html>