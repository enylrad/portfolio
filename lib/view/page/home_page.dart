import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:my_portfolio/view/page/about_me_page.dart';
import 'package:my_portfolio/view/page/curriculum_page.dart';
import 'package:my_portfolio/view/page/portfolio_page.dart';
import 'package:my_portfolio/view/widget/adaptative_widget.dart';

class HomePage extends StatefulWidget {
  static const String route = '/';

  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _selectedIndex = 0;

  final List<Widget> _children = [
    const AboutMePage(),
    const PortfolioPage(),
    const CurriculumPage(),
  ];

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: AdaptiveScaffold(
          title: Text(AppLocalizations.of(context).appName),
          body: _children[_selectedIndex],
          destinations: [
            AdaptiveScaffoldDestination(
              title: AppLocalizations.of(context).aboutMeTitle,
              icon: const Icon(Icons.account_circle_outlined),
              selectedIcon: const Icon(Icons.account_circle_rounded),
            ),
            AdaptiveScaffoldDestination(
              title: AppLocalizations.of(context).portfolioTitle,
              icon: const Icon(Icons.view_list_outlined),
              selectedIcon: const Icon(Icons.view_list_rounded),
            ),
            AdaptiveScaffoldDestination(
              title: AppLocalizations.of(context).curriculumTitle,
              icon: const Icon(Icons.my_library_books_outlined),
              selectedIcon: const Icon(Icons.my_library_books_rounded),
            ),
          ],
          currentIndex: _selectedIndex,
          onNavigationIndexChange: (int index) =>
              setState(() => _selectedIndex = index),
        ),
      ),
    );
  }
}
