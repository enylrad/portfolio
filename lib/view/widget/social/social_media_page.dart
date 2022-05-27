import 'package:flutter/cupertino.dart';
import 'package:flutter_svg/svg.dart';
import 'package:my_portfolio/view/widget/social/types/social_media_types.dart';
import 'package:url_launcher/url_launcher.dart';

class SocialButton extends StatelessWidget {
  const SocialButton({
    Key? key,
    required this.socialNetwork,
  }) : super(key: key);

  final SocialNetwork socialNetwork;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        child: Container(
          alignment: Alignment.center,
          padding: const EdgeInsets.all(10),
          height: 50,
          width: 50,
          child: SvgPicture.asset(
            socialNetwork.asset,
            matchTextDirection: true,
          ),
        ),
        onTap: () => launchUrl(Uri.parse(socialNetwork.url)),
      ),
    );
  }
}
