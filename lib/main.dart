
import 'package:flutter/material.dart';
import 'package:my_portfolio/app.dart';
import 'package:my_portfolio/core/factory/app_theme_factory.dart';
import 'package:my_portfolio/core/theme/style_type.dart';

void main() async {
    WidgetsFlutterBinding.ensureInitialized();

    final lightThemeData = await AppThemeFactory.create(
      AppThemeType.normal,
      isDark: false,
    );
    final darkThemeData = await AppThemeFactory.create(
      AppThemeType.normal,
      isDark: true,
    );

    runApp(App(
      lightThemeData: lightThemeData,
      darkThemeData: darkThemeData,
    ));

}


