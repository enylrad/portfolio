import 'package:flutter/material.dart';
import 'package:my_portfolio/core/ext/app_localizations_context.dart';

class CurriculumPage extends StatelessWidget {
  static const String route = '/curriculum';
  const CurriculumPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      alignment: Alignment.center,
      child: Text(context.loc.curriculumVitae),
    );
  }
}
