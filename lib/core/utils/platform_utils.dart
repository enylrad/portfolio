import 'dart:io';

import 'package:flutter/foundation.dart';

bool get isIOS => !kIsWeb && Platform.isIOS;

bool get isAndroid => !kIsWeb && Platform.isAndroid;

bool get isWeb => kIsWeb;
