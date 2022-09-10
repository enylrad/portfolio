import 'package:flutter/material.dart';
import 'package:my_portfolio/core/ext/context_ext.dart';
import 'package:my_portfolio/ui/widgets/error_widget.dart';

class CurriculumPage extends StatelessWidget {
  static const String route = '/curriculum';

  const CurriculumPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(context.loc.curriculumTitle),
        const ErrorLottie(),
      ],
    );
  }
}
