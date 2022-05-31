import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:my_portfolio/core/ext/context_ext.dart';
import 'package:my_portfolio/core/model/AppInfo.dart';

class AdapterApp extends StatefulWidget {
  const AdapterApp({
    Key? key,
    required this.app,
  }) : super(key: key);

  final AppInfo app;

  @override
  State<AdapterApp> createState() => _AdapterAppState();
}

class _AdapterAppState extends State<AdapterApp> {
  bool _hover = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      onEnter: (_) => setState(() => _hover = true),
      onExit: (_) => setState(() => _hover = false),
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
                    image: buildImage(widget.app),
                    colorFilter: ColorFilter.mode(
                      context.theme.colorScheme.primary
                          .withOpacity(_hover ? 0.5 : 1),
                      BlendMode.dstATop,
                    ),
                    fit: BoxFit.cover,
                  ),
                ),
                child: _hover
                    ? Padding(
                        padding: const EdgeInsets.all(20.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              widget.app.name,
                              style: context.theme.textTheme.titleLarge,
                            ),
                            const SizedBox(
                              height: 10,
                            ),
                            Text(
                              widget.app.description,
                              style: context.theme.textTheme.bodyLarge,
                            ),
                          ],
                        ),
                      )
                    : Container()),
          ),
        ),
        onTap: () {
          ScaffoldMessenger.of(context).showSnackBar(SnackBar(
            content: Text(context.loc.comingSoon),
          ));
        },
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
}
