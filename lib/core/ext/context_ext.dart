import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

extension LocalizedBuildContext on BuildContext {
  AppLocalizations get loc => AppLocalizations.of(this);
}

extension ThemeBuildContext on BuildContext {
  ThemeData get theme => Theme.of(this);
}

extension MediaQueryBuildContext on BuildContext {
  MediaQueryData get mediaQuery => MediaQuery.of(this);
}
