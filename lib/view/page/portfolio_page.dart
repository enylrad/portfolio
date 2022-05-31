import 'package:flutter/material.dart';
import 'package:my_portfolio/data/mock/appsData.dart';
import 'package:my_portfolio/view/widget/grid_apps_widget.dart';

class PortfolioPage extends StatelessWidget {
  static const String route = '/portfolio';

  const PortfolioPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GridApps(
      apps: appsData,
    );
  }
}
