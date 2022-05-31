import 'package:flutter/widgets.dart';

bool isExtraLargeScreen(BuildContext context) {
  return MediaQuery.of(context).size.width > 1620.0;
}

bool isLargeScreen(BuildContext context) {
  return MediaQuery.of(context).size.width > 960.0;
}

bool isMediumScreen(BuildContext context) {
  return MediaQuery.of(context).size.width > 640.0;
}
