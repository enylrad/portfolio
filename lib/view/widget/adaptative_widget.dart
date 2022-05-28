// Copyright 2020, the Flutter project authors. Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'package:flutter/material.dart';

bool _isLargeScreen(BuildContext context) {
  return MediaQuery.of(context).size.width > 960.0;
}

bool _isMediumScreen(BuildContext context) {
  return MediaQuery.of(context).size.width > 640.0;
}

/// See bottomNavigationBarItem or NavigationRailDestination
class AdaptiveScaffoldDestination {
  final String title;
  final Widget icon;
  final Widget selectedIcon;

  const AdaptiveScaffoldDestination({
    required this.title,
    required this.icon,
    required this.selectedIcon,
  });
}

/// A widget that adapts to the current display size, displaying a [Drawer],
/// [NavigationRail], or [BottomNavigationBar]. Navigation destinations are
/// defined in the [destinations] parameter.
class AdaptiveScaffold extends StatefulWidget {
  final Widget? title;
  final List<Widget> actions;
  final Widget? body;
  final int currentIndex;
  final List<AdaptiveScaffoldDestination> destinations;
  final ValueChanged<int>? onNavigationIndexChange;
  final FloatingActionButton? floatingActionButton;

  const AdaptiveScaffold({
    this.title,
    this.body,
    this.actions = const [],
    required this.currentIndex,
    required this.destinations,
    this.onNavigationIndexChange,
    this.floatingActionButton,
    super.key,
  });

  @override
  State<AdaptiveScaffold> createState() => _AdaptiveScaffoldState();
}

class _AdaptiveScaffoldState extends State<AdaptiveScaffold> {
  @override
  Widget build(BuildContext context) {
    // Show a navigation rail
    if (_isMediumScreen(context) || _isLargeScreen(context)) {
      return Scaffold(
        body: Row(
          children: [
            NavigationRail(
              leading: widget.floatingActionButton,
              extended: _isLargeScreen(context),
              destinations: [
                ...widget.destinations.map(
                  (d) => NavigationRailDestination(
                    icon: d.icon,
                    selectedIcon: d.selectedIcon,
                    label: Text(d.title),
                  ),
                ),
              ],
              selectedIndex: widget.currentIndex,
              onDestinationSelected: widget.onNavigationIndexChange ?? (_) {},
            ),
            const VerticalDivider(
              width: 1,
              thickness: 1,
            ),
            Expanded(
              child: SingleChildScrollView(
                child: widget.body!,
              ),
            ),
          ],
        ),
      );
    }

    // Show a bottom app bar
    return Scaffold(
      body: SingleChildScrollView(
        child: widget.body!,
      ),
      bottomNavigationBar: NavigationBar(
        destinations: [
          ...widget.destinations.map(
            (d) => NavigationDestination(
              icon: d.icon,
              selectedIcon: d.selectedIcon,
              label: d.title,
            ),
          ),
        ],
        selectedIndex: widget.currentIndex,
        onDestinationSelected: widget.onNavigationIndexChange,
      ),
      floatingActionButton: widget.floatingActionButton,
    );
  }
}
