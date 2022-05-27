import 'package:flutter/material.dart';
import 'package:my_portfolio/view/page/home_page.dart';

Map<String, WidgetBuilder> getApplicationRoutes() {
  return <String, WidgetBuilder>{
    HomePage.route: (BuildContext context) => HomePage(),
  };
}

String getDefaultRoute() => HomePage.route;