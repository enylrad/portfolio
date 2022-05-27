import 'package:flutter/material.dart';
import 'package:my_portfolio/core/ext/app_localizations_context.dart';

class PortfolioPage extends StatelessWidget {
  static const String route = '/portfolio';
  const PortfolioPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      alignment: Alignment.center,
      child: Text(context.loc.portfolio),
    );
  }
}
