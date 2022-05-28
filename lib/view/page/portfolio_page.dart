import 'package:flutter/material.dart';
import 'package:my_portfolio/core/ext/context_ext.dart';
import 'package:my_portfolio/view/widget/error_widget.dart';

class PortfolioPage extends StatelessWidget {
  static const String route = '/portfolio';

  const PortfolioPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(context.loc.portfolio),
        const ErrorLottie(),
      ],
    );
  }
}
