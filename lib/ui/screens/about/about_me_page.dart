import 'package:flutter/material.dart';
import 'package:my_portfolio/core/ext/context_ext.dart';
import 'package:my_portfolio/ui/widgets/avatar_profile_widget.dart';
import 'package:my_portfolio/ui/widgets/social_buttons_widget.dart';

class AboutMePage extends StatelessWidget {
  static const String route = '/aboutme';

  const AboutMePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Container(
        alignment: Alignment.center,
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            const AvatarProfile(),
            const SizedBox(
              height: 10.0,
            ),
            const SocialNetworks(),
            Divider(
              indent: 60,
              endIndent: 60,
              color: context.theme.colorScheme.onBackground,
            ),
            Container(
              padding: const EdgeInsets.only(
                left: 70,
                right: 70,
                top: 20,
              ),
              child: Text(
                context.loc.aboutMe,
                textAlign: TextAlign.center,
                style: context.theme.textTheme.bodyMedium,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
