import 'package:flutter/material.dart';
import 'package:my_portfolio/core/ext/context_ext.dart';
import 'package:my_portfolio/ui/screens/about/about_me_page.dart';
import 'package:my_portfolio/ui/screens/curriculum/curriculum_page.dart';
import 'package:my_portfolio/ui/screens/portfolio/portfolio_page.dart';
import 'package:my_portfolio/ui/widgets/adaptive_widget.dart';

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
          title: Text(context.loc.appName),
          body: _children[_selectedIndex],
          destinations: [
            AdaptiveScaffoldDestination(
              title: context.loc.aboutMeTitle,
              icon: const Icon(Icons.account_circle_outlined),
              selectedIcon: const Icon(Icons.account_circle_rounded),
            ),
            AdaptiveScaffoldDestination(
              title: context.loc.portfolioTitle,
              icon: const Icon(Icons.view_list_outlined),
              selectedIcon: const Icon(Icons.view_list_rounded),
            ),
            AdaptiveScaffoldDestination(
              title: context.loc.curriculumTitle,
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
