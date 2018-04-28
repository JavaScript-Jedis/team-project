<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <script src="js/jquery-3.3.1.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js" integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="js\bootstrap\bootstrap-4.0.0\css\bootstrap.min.css">
        <link rel="stylesheet" href="js\bootstrap\bootstrap-4.0.0\css\bootstrap-reboot.min.css">
        <link rel="stylesheet" href="css/site.css">
        <script type="text/javascript" src="js/bootstrap/bootstrap-4.0.0/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="js/menufooterloader.js"></script>
        <title>Contact Me</title>
    </head>
    <body>
        <!--Nav bar-->
        <header id="menu">
            <script>loadMenu();</script>
        </header>

        <!--Welcome-->
        <div class="container-fluid col-7">
            <div class="row justify-content-center text">
                <h2>Contact Me</h2>

			</div>
			<div class="row justify-content-center text ">
			I would appreciate if you would leave your contact information if you are interested.
			</div>
        </div>
        <!--Form-->
        <div class="container-fluid col-7">
            <div class="row justify-content-center">

				<form method="POST">

					<table>
						<tr><td><label for="myName">Name:</label></td><td><input type="text" name="myName" placeholder="Please enter your name" required> *</td></tr>
						<br>
						<tr><td><label for="myEmail">Email:</label></td><td><input type="email" name="myEmail" placeholder="Please enter your email" required> *</td></tr>
						<br>
						<tr><td><label for="myMessage">Message:</label></td><td><textarea name="myMessage"></textarea></td></tr>
						<br>
						<tr><td></td><td align="center"><input type="submit" value="Send"></td></tr>
					</table>

				</form>
            </div>
        </div>
        <!--php email code-->
        <?php
        $name = $_POST["myName"];
        $email = $_POST['myEmail'];
        $message = $_POST['myMessage'];

        $to = "tooeleflyboy@gmail.com";
        $subject = "New Contact";
        $messageBody = "You received a new message from: $name:\n $message\n Their email is: $email";

        mail($to, $subject, $messageBody);
        ?>
    </body>
    <!--footer-->
    <footer id="footer">
        <script>loadFooter();</script>
    </footer>
</html>
