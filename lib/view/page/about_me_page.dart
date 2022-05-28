import 'package:flutter/material.dart';
import 'package:my_portfolio/view/widget/avatar_profile_widget.dart';
import 'package:my_portfolio/view/widget/social_network_widget.dart';

class AboutMePage extends StatelessWidget {
  static const String route = '/aboutme';
  const AboutMePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      alignment: Alignment.center,
      padding: const EdgeInsets.all(20),
      child: Column(
        children: const [
          AvatarProfile(),
          SizedBox(height: 10.0),
          SocialNetworks(),
        ],
      ),
    );
  }
}
