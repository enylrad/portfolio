import 'package:flutter/widgets.dart';
import 'package:my_portfolio/core/ext/context_ext.dart';

bool isExtraLargeScreen(BuildContext context) {
  return context.mediaQuery.size.width > 1620.0;
}

bool isLargeScreen(BuildContext context) {
  return context.mediaQuery.size.width > 960.0;
}

bool isMediumScreen(BuildContext context) {
  return context.mediaQuery.size.width > 640.0;
}
