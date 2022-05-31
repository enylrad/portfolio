import 'package:flutter/material.dart';
import 'package:my_portfolio/view/widget/social/social_button_widget.dart';
import 'package:my_portfolio/view/widget/social/types/social_types.dart';

class SocialNetworks extends StatelessWidget {
  const SocialNetworks({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
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
            SocialButton(
              socialNetwork: buildSocialNetwork(
                Social.mail,
                'enylrad@gmail.com',
              ),
            ),
          ],
        ),
      ],
    );
  }
}
