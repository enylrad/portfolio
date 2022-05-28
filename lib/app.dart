import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:my_portfolio/core/ext/context_ext.dart';
import 'package:my_portfolio/core/theme/app_theme.dart';
import 'package:my_portfolio/core/theme/app_theme_data.dart';
import 'package:my_portfolio/view/navigator.dart';

class App extends StatelessWidget {
  const App({
    Key? key,
    required this.lightThemeData,
    required this.darkThemeData,
  }) : super(key: key);

  final AppThemeData lightThemeData;
  final AppThemeData darkThemeData;

  @override
  Widget build(BuildContext context) {
    const themeMode = ThemeMode.system;

    return MaterialApp(
      debugShowCheckedModeBanner: false,
      themeMode: themeMode,
      onGenerateTitle: (BuildContext context) => context.loc.appName,
      localizationsDelegates: const [
        AppLocalizations.delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      supportedLocales: const [
        Locale('en', ''),
        Locale('es', ''),
      ],
      initialRoute: getDefaultRoute(),
      routes: getApplicationRoutes(),
      builder: (context, child) => AppOverlay(
        lightStyleData: lightThemeData,
        darkStyleData: darkThemeData,
        themeMode: themeMode,
        child: child ?? const Offstage(),
      ),
      theme: lightThemeData.materialThemeData,
      darkTheme: darkThemeData.materialThemeData,
    );
  }
}

class AppOverlay extends StatelessWidget {
  const AppOverlay({
    Key? key,
    required this.lightStyleData,
    required this.darkStyleData,
    required this.themeMode,
    required this.child,
  }) : super(key: key);

  final AppThemeData lightStyleData;
  final AppThemeData darkStyleData;
  final ThemeMode themeMode;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return AppTheme(
      themeData: _useDarkStyle(context) ? darkStyleData : lightStyleData,
      child: child,
    );
  }

  bool _useDarkStyle(BuildContext context) {
    return themeMode == ThemeMode.dark ||
        (themeMode == ThemeMode.system &&
            MediaQuery.platformBrightnessOf(context) == Brightness.dark);
  }
}
