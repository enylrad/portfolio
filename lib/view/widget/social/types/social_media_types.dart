import 'package:my_portfolio/core/constants/assets_images_const.dart';

enum Social {
  github,
  twitter,
  linkedin,
  mail,
}

class SocialNetwork {
  final Social social;
  final String asset;
  final String url;

  SocialNetwork({
    required this.social,
    required this.asset,
    required this.url,
  });
}

SocialNetwork buildSocialNetwork(Social social, String idUser) {
  switch (social) {
    case Social.github:
      return SocialNetwork(
        social: social,
        url: 'https://github.com/$idUser',
        asset: AssetsImage.github,
      );
    case Social.twitter:
      return SocialNetwork(
        social: social,
        url: 'https://twitter.com/$idUser',
        asset: AssetsImage.twitter,
      );
    case Social.linkedin:
      return SocialNetwork(
        social: social,
        url: 'https://www.linkedin.com/in/$idUser',
        asset: AssetsImage.linkedin,
      );
    case Social.mail:
      return SocialNetwork(
        social: social,
        url: 'mailto:$idUser',
        asset: AssetsImage.mail,
      );
  }
}
