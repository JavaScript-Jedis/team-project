function loadMenu()
{
	var menu  = "<div class=\"container\"><nav class=\"navbar navbar-expand-lg navbar-light bg-light\"><a class=\"navbar-brand\" href=\"index.html\">Company</a><button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarNav\" aria-controls=\"navbarNav\" aria-expanded=\"false\" aria-label=\"Toggle navigation\"><span class=\"navbar-toggler-icon\"></span></button><div class=\"collapse navbar-collapse\" id=\"navbarNav\"><ul class=\"navbar-nav\"><li class=\"nav-item\"><a class=\"nav-link\" href=\"store.html\">Planes</a></li><li class=\"nav-item\"><a class=\"nav-link\" href=\"about.html\">About Us</a></li><li class=\"nav-item\"><a class=\"nav-link\" href=\"contact.php\">Contact Us</a></li></ul></div></nav></div>";
	document.getElementById("menu").innerHTML = menu;
}
