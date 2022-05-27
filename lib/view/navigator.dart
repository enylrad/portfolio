import 'package:flutter/material.dart';
import 'package:my_portfolio/view/page/aboutme_page.dart';
import 'package:my_portfolio/view/page/curriculum_page.dart';
import 'package:my_portfolio/view/page/home_page.dart';
import 'package:my_portfolio/view/page/portfolio_page.dart';

Map<String, WidgetBuilder> getApplicationRoutes() {
  return <String, WidgetBuilder>{
    HomePage.route: (BuildContext context) => const HomePage(),
    AboutMePage.route: (BuildContext context) => const AboutMePage(),
    PortfolioPage.route: (BuildContext context) => const PortfolioPage(),
    CurriculumPage.route: (BuildContext context) => const CurriculumPage(),
  };
}

String getDefaultRoute() => HomePage.route;