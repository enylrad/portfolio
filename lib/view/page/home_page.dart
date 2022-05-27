import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:my_portfolio/view/widget/adaptative_widget.dart';

class HomePage extends StatefulWidget {
  static const String route = '/';

  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: AdaptiveScaffold(
        title: Text(AppLocalizations.of(context).appName),
        body: Center(
          child: Text(
            AppLocalizations.of(context).appName,
          ),
        ),
        destinations: [
          AdaptiveScaffoldDestination(
            title: AppLocalizations.of(context).aboutMe,
            icon: Icon(Icons.account_circle_outlined),
            selectedIcon: Icon(Icons.account_circle_rounded),
          ),
          AdaptiveScaffoldDestination(
            title: AppLocalizations.of(context).portfolio,
            icon: Icon(Icons.my_library_books_outlined),
            selectedIcon: Icon(Icons.my_library_books_rounded),
          ),
          AdaptiveScaffoldDestination(
            title: AppLocalizations.of(context).curriculumVitae,
            icon: Icon(Icons.bookmark_border),
            selectedIcon: Icon(Icons.bookmark_rounded),
          ),
        ],
        currentIndex: _selectedIndex,
        onNavigationIndexChange: (int index) =>
            setState(() => _selectedIndex = index),
      ),
    );
  }
}