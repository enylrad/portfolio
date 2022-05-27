import 'package:flutter/material.dart';
import 'package:my_portfolio/core/ext/app_localizations_context.dart';
import 'package:my_portfolio/view/widget/social/social_media_page.dart';
import 'package:my_portfolio/view/widget/social/types/social_media_types.dart';

class AvatarProfile extends StatelessWidget {
  const AvatarProfile({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          width: 120.0,
          height: 120.0,
          decoration: BoxDecoration(
            image: const DecorationImage(
              image: AssetImage('images/avatar.jpeg'),
              fit: BoxFit.cover,
            ),
            borderRadius: const BorderRadius.all( Radius.circular(120.0)),
            border: Border.all(
              color: Theme.of(context).colorScheme.onBackground,
              width: 2.0,
            ),
          ),
        ),
        const SizedBox(height: 20.0),
        Text(
          context.loc.myName,
          style: Theme.of(context).textTheme.titleLarge,
        ),
        const SizedBox(height: 10.0),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            SocialButton(
              socialNetwork: buildSocialNetwork(
                Social.github,
                'enylrad',
              ),
            ),
            SocialButton(
              socialNetwork: buildSocialNetwork(
                Social.linkedin,
                'davidperezsalort',
              ),
            ),
            SocialButton(
              socialNetwork: buildSocialNetwork(
                Social.twitter,
                'david_eny',
              ),
            ),
          ],
        ),
      ],
    );
  }
}
