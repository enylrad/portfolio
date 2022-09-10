import 'package:my_portfolio/assets.dart';

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
        asset: ImagePaths.github,
      );
    case Social.twitter:
      return SocialType(
        social: social,
        url: 'https://twitter.com/$idUser',
        asset: ImagePaths.twitter,
      );
    case Social.linkedin:
      return SocialType(
        social: social,
        url: 'https://www.linkedin.com/in/$idUser',
        asset: ImagePaths.linkedin,
      );
    case Social.mail:
      return SocialType(
        social: social,
        url: 'mailto:$idUser',
        asset: ImagePaths.mail,
      );
  }
}
