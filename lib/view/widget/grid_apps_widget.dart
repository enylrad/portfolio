import 'package:flutter/material.dart';
import 'package:my_portfolio/core/model/AppInfo.dart';
import 'package:my_portfolio/core/utils/size_utils.dart';
import 'package:my_portfolio/view/widget/adapter_app_widget.dart';

class GridApps extends StatefulWidget {
  final List<AppInfo> apps;

  const GridApps({
    required this.apps,
    super.key,
  });

  @override
  State<GridApps> createState() => _GridAppsState();
}

class _GridAppsState extends State<GridApps> {
  @override
  Widget build(BuildContext context) {
    return GridView.builder(
      padding: const EdgeInsets.all(10),
      itemCount: widget.apps.length,
      scrollDirection: Axis.vertical,
      itemBuilder: (context, index) {
        return AdapterApp(
          app: widget.apps[index],
        );
      },
      gridDelegate: buildGridDelegate(context),
    );
  }

  SliverGridDelegateWithFixedCrossAxisCount buildGridDelegate(
      BuildContext context) {
    return SliverGridDelegateWithFixedCrossAxisCount(
      crossAxisCount: crossAxisCountDynamic(context),
      childAspectRatio: childAspectRatioDynamic(context),
      crossAxisSpacing: 10,
      mainAxisSpacing: 10,
      mainAxisExtent: 200,
    );
  }

  double childAspectRatioDynamic(BuildContext context) {
    var size = MediaQuery.of(context).size;

    double height;

    if (isLargeScreen(context)) {
      height = size.height;
    } else if (isMediumScreen(context)) {
      height = size.height / 2;
    } else {
      height = size.height / 3;
    }

    return size.width / height;
  }

  int crossAxisCountDynamic(BuildContext context) {
    if (isExtraLargeScreen(context)) {
      return 4;
    } else if (isLargeScreen(context)) {
      return 3;
    } else if (isMediumScreen(context)) {
      return 2;
    } else {
      return 1;
    }
  }
}
