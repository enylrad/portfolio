import 'package:flutter/material.dart';
import 'package:my_portfolio/view/widget/avatar_profile_widget.dart';

class AboutMePage extends StatelessWidget {
  static const String route = '/aboutme';
  const AboutMePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      alignment: Alignment.center,
      padding: const EdgeInsets.all(20),
      child: const AvatarProfile(),
    );
  }
}
