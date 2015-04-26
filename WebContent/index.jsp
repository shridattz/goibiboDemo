<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">

<head>

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="Demo App">
<meta name="author" content="Shridatt">

<title>Demo</title>

<!-- Bootstrap Core CSS -->
<link href="css/bootstrap.css" rel="stylesheet">

<!-- Custom CSS -->
<link href="css/modern-business.css" rel="stylesheet">

<!-- Custom Fonts -->
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet"
	type="text/css">
<link href="css/roboto.min.css" rel="stylesheet">
<link href="css/material.min.css" rel="stylesheet">
<link href="css/ripples.min.css" rel="stylesheet">
<link href="css/bootstrap-material-datepicker.css" rel="stylesheet">

<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>

	<!-- Navigation -->
	<nav class="navbar navbar-material-light-green navbar-fixed-top"
		role="navigation">
	<div class="container">
		<!-- Brand and toggle get grouped for better mobile display -->
		<div class="navbar-header">
			<button type="button" class="navbar-toggle" data-toggle="collapse"
				data-target="#bs-example-navbar-collapse-1">
				<span class="sr-only">Toggle navigation</span> <span
					class="icon-bar"></span> <span class="icon-bar"></span> <span
					class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="index.html">Demo</a>
		</div>
		<!-- Collect the nav links, forms, and other content for toggling -->
		<div class="collapse navbar-collapse"
			id="bs-example-navbar-collapse-1">
			<ul class="nav navbar-nav navbar-right">
				<li><a href="index.html">Search</a></li>
			</ul>
		</div>
		<!-- /.navbar-collapse -->
	</div>
	<!-- /.container --> </nav>


	<!-- Page Content -->
	<div class="container">

		<form id="searchForm" name="searchForm"></form>
		<div class="row">
			<div class="col-lg-12">
				<div class="jumbotron">
					<h3>Search Flights</h3>
					<div class="row">
						<div class="col-md-1"></div>
						<div class="col-md-10">
							<div class="form-group">
								<div class="col-md-6">
									<input type="text" class="form-control" id="from" name="from"
										placeholder="From" autocomplete="off" data-provide="typeahead"
										form="searchForm" />
								</div>
								<div class="col-md-6">
									<input type="text" class="form-control" id="to" name="to"
										placeholder="To" autocomplete="off" data-provide="typeahead"
										form="searchForm" />
								</div>
							</div>
							<div class="form-group">
								<div class="col-md-3">
									<input type="text" class="form-control" id="depart"
										name="depart" placeholder="Departure Date" autocomplete="off"
										form="searchForm" />
								</div>
								<div class="col-md-3">
									<input type="text" class="form-control" id="return"
										name="return" placeholder="Return Date" autocomplete="off"
										form="searchForm" />
								</div>
								<div class="col-md-3">
									<select class="form-control" id="passengers" name="passengers"
										form="searchForm">
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
										<option value="5">5</option>
										<option value="6">6</option>
										<option value="7">7</option>
										<option value="8">8</option>
										<option value="9">9</option>
									</select>

								</div>

								<div class="col-md-3">
									<select class="form-control" id="class" name="class"
										form="searchForm">
										<option value="E">Economy</option>
										<option value="B">Business</option>
									</select>
								</div>
							</div>
							<div class="col-md-2 col-md-offset-10">
								<a id="searchBtn" href="javascript:void(0)"
									class="btn btn-success btn-large">Search</a>
							</div>

						</div>
						<div class="col-md-1"></div>
					</div>
				</div>
			</div>


		</div>
		<!-- /.row -->

		<!-- results -->
		<div class="row">
			<div class="col-md-1"></div>
			<div class="col-md-10">

				<div class="row" id="resultRow">
					</div>
				</div>

			</div>
			<div class="col-md-1"></div>


		</div>
		<!-- /results -->

		<!-- Footer -->
		<footer>
		<div class="row">
			<div class="col-lg-12">
				<p>Copyright &copy; Your Website 2015</p>
			</div>
		</div>
		</footer>

	</div>
	<!-- /.container -->

	<!-- loader -->
	<div id="loader" style="display: none">
		<p>Please Wait...</p>
		<img src="img/loader.gif" />
	</div>

	<!-- jQuery -->
	<script src="js/jquery.js"></script>

	<!-- Bootstrap Core JavaScript -->
	<script src="js/bootstrap.js"></script>
	<script src="js/ripples.min.js"></script>
	<script src="js/material.min.js"></script>
	<script src="js/moment-with-locales.js"></script>
	<script src="js/bootstrap-material-datepicker.js"></script>
	<script src="js/bootstrap3-typeahead.js"></script>
	<script src="js/jquery.blockUI.js"></script>
	<script src="js/custom.js"></script>
	<script src="js/worker.js"></script>

</body>

</html>
