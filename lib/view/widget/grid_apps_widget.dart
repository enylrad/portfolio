import 'package:flutter/material.dart';
import 'package:my_portfolio/core/ext/context_ext.dart';
import 'package:my_portfolio/core/model/AppInfo.dart';
import 'package:my_portfolio/core/utils/size_utils.dart';

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
    return Container(
      alignment: Alignment.topCenter,
      child: GridView.builder(
        padding: const EdgeInsets.all(10),
        itemCount: widget.apps.length,
        shrinkWrap: true,
        itemBuilder: (context, index) {
          var app = widget.apps[index];
          return MouseRegion(
            cursor: SystemMouseCursors.click,
            child: GestureDetector(
              child: SizedBox(
                child: Card(
                  semanticContainer: true,
                  clipBehavior: Clip.antiAliasWithSaveLayer,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10.0),
                  ),
                  elevation: 5,
                  margin: const EdgeInsets.all(10),
                  child: Container(
                      decoration: BoxDecoration(
                        image: DecorationImage(
                          image: buildImage(app),
                          colorFilter: ColorFilter.mode(
                            context.theme.colorScheme.primary.withOpacity(0.3),
                            BlendMode.dstATop,
                          ),
                          fit: BoxFit.cover,
                        ),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.all(20.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              app.name,
                              style: context.theme.textTheme.titleLarge,
                            ),
                            const SizedBox(
                              height: 10,
                            ),
                            Text(
                              app.description,
                              style: context.theme.textTheme.bodyLarge,
                            ),
                          ],
                        ),
                      )),
                ),
              ),
              onTap: () {
                ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                  content: Text(context.loc.comingSoon),
                ));
              },
            ),
          );
        },
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: crossAxisCountDynamic(context),
          childAspectRatio: childAspectRatioDynamic(context),
          crossAxisSpacing: 10,
          mainAxisSpacing: 10,
          mainAxisExtent: 200,
        ),
      ),
    );
  }

  ImageProvider buildImage(AppInfo app) {
    if (app.image.startsWith('assets')) {
      return AssetImage(app.image);
    } else {
      return NetworkImage(app.image);
    }
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
