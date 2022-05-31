import 'package:my_portfolio/core/constants/assets_images_const.dart';

enum Social {
  github,
  twitter,
  linkedin,
  mail,
}

class SocialType {
  final Social social;
  final String asset;
  final String url;

  SocialType({
    required this.social,
    required this.asset,
    required this.url,
  });
}

SocialType buildSocialNetwork(Social social, String idUser) {
  switch (social) {
    case Social.github:
      return SocialType(
        social: social,
        url: 'https://github.com/$idUser',
        asset: AssetsImage.github,
      );
    case Social.twitter:
      return SocialType(
        social: social,
        url: 'https://twitter.com/$idUser',
        asset: AssetsImage.twitter,
      );
    case Social.linkedin:
      return SocialType(
        social: social,
        url: 'https://www.linkedin.com/in/$idUser',
        asset: AssetsImage.linkedin,
      );
    case Social.mail:
      return SocialType(
        social: social,
        url: 'mailto:$idUser',
        asset: AssetsImage.mail,
      );
  }
}
