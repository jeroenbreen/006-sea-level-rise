<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Sea Level Rise</title>

        <!-- less -->
        <script>
        less = {
            env : "development",
            async : false,
            fileAsync : true,
            poll : 1000,
            functions : {},
            dumpLineNumbers : 'mediaquery',
            relativeUrls : false,
            logLevel : 0
        };
        </script>
        <link rel="stylesheet/less" type="text/css" href="main.less" />
        <script src="assets/less.js/dist/less-1.7.0.min.js"></script>
        <!-- end less -->

        <link href="https://fonts.googleapis.com/css?family=Fira+Sans:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=PT+Serif:400,700" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400,700" rel="stylesheet">

        <!--<link rel="stylesheet" type="text/css" href="assets/jquery-ui/jquery-ui.min.css">-->


        <!-- assets -->
        <script src="assets/jquery/jquery.min.js"></script>
        <script src="assets/jquery-ui/jquery-ui.js"></script>
        <script src="js/babylon/babylon.js"></script>

        <!-- app -->
        <script src="js/models/App.js"></script>
        <script src="js/models/Collapse.js"></script>
        <script src="js/models/tiles/_Controller.js"></script>
        <script src="js/models/tiles/Tile.js"></script>
        <script src="js/models/tiles/City.js"></script>
        <script src="js/models/tiles/Slider.js"></script>
        <script src="js/models/tiles/Carrousel.js"></script>


        <script src="js/content/tiles.js"></script>
        <script src="js/tools.js"></script>
        <script src="js/settings.js"></script>

        <script src="js/main.js"></script>

    </head>

    <body>

        <div id="menu">
            <?php include('php/menu.php'); ?>
        </div>

        <div id="content">
            <div class="collapse">
                <div class="collapse-body">
                    <div class="pagewrap">
                        <?php include('php/introduction.php'); ?>
                    </div>
                </div>
                <div class="collapse-head">
                    Introduction
                </div>
            </div>

            <div class="collapse">
                <div class="collapse-body">
                    <div class="pagewrap">
                        <?php include('php/causes.php'); ?>
                    </div>
                </div>
                <div class="collapse-head">
                    Causes
                </div>
            </div>

            <div class="collapse collapse--open">
                <div class="collapse-body">
                    <div class="pagewrap">
                        <?php include('php/cases.php'); ?>
                    </div>
                </div>
                <div class="collapse-head">
                    Cases
                </div>
            </div>
        </div>

    </body>
</html>