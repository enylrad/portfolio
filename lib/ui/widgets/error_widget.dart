import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';
import 'package:my_portfolio/assets.dart';

class ErrorLottie extends StatelessWidget {
  const ErrorLottie({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 500,
      width: 500,
      padding: const EdgeInsets.all(60.0),
      alignment: Alignment.center,
      child: Lottie.asset(ImagePaths.crash),
    );
  }
}
