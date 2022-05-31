import 'package:flutter/material.dart';
import 'package:my_portfolio/core/model/AppInfo.dart';
import 'package:my_portfolio/view/widget/grid_apps_widget.dart';

class PortfolioPage extends StatelessWidget {
  static const String route = '/portfolio';

  const PortfolioPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    List<AppInfo> apps = List<AppInfo>.generate(
        10,
        (index) => AppInfo(
              name: 'App $index',
              description: 'Description $index',
              image: 'https://picsum.photos/id/$index/200/200',
            ));

    return GridApps(
      apps: apps,
    );
  }
}
