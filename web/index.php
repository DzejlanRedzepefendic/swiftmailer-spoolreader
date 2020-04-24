<?php
require_once '../config/config.php';
?>
<!DOCTYPE html>
<html>
<head>
    <title>Swiftmailer Spool Reader</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <link href="css/bootstrap.css" rel="stylesheet"/>
    <script type="text/javascript" src="js/jquery-2.1.0.min.js"></script>
    <script type="text/javascript" src="js/moment.min.js"></script>
    <script type="text/javascript" src="js/bootstrap.js"></script>
    <style type="text/css">
        @import url("https://fonts.googleapis.com/css?family=Inter:300,400,500,600,700&display=swap");
        html, body {
            font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
        }
        #main {
            padding: 0 50px;
        }
        .message-date {
            width: 170px;
        }
        .message-additional-header {
            font-size: 12px;
            margin-top: 3px;
        }
        .message-additional-header .field-name {
            margin-right: 3px;
        }
        .message-additional-header .field-name:after {
            content: ':';
        }
        .message-actions {
            vertical-align: middle;
            text-align: right;
        }
        .modal {
            width: 1024px;
            margin-left : 120px;
            overflow-y: hidden;
        }
        .modal-content {
            width: 800px;
        }
        .modal-body {
            padding: 0px;
            padding-bottom: 20px;
        }
        .modal-body iframe {
            border: 0px;
            width: 100%;
            padding: 10px;
            min-height: 500px;
        }
        :focus {
            outline: 0 !important;
        }
        .total-messages {
            font-weight: bold;
        }
        .action-clear, .action-fetch {
            margin-left: 10px;
        }
    </style>
</head>
<body>
<div id="main" class="container-fluid">
    <div class="row">
        <div class="col-xs-12">
            <h2>Spool Reader</h2>
        </div>
    </div>
    <div class="row" style='margin-top: 20px;'>
        <div class="col-xs-6">
            Found <span class="total-messages">0</span> spooled emails in in <code><?php echo SPOOL_DIR;?></code>
        </div>
        <div class="col-xs-6">
            <button type='button' class='btn btn-sm btn-danger pull-right action-clear'>Clear Spool</button>
            &nbsp;&nbsp;
            <button type='button' class='btn btn-sm btn-primary pull-right action-fetch'>Refresh</button>            
        </div>
    </div>
    <div class="row" style='margin-top: 20px;'>
        <div class="col-xs-12">
            <table class="table table-striped table-hover messages">
            <thead>
            <tr>
                <th>#</th>
                <th>Date</th>
                <th>From</th>
                <th>Reply To</th>
                <th>To</th>
                <th>Subject</th>
                <th class='text-right'>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr class="loading">
                <td colspan="7">Loading...</td>
            </tr>
            </tbody>
        </table>
            <div id="modalHolder"></div>
        </div>
    </div>
</div>

<script type="text/javascript" src="js/main.js"></script>

</body>
</html>
