import 'package:flutter/material.dart';

class ThirdPage extends StatefulWidget {
  static const routeName = 'third_page';

  @override
  State<ThirdPage> createState() => _ThirdPageState();
}

class _ThirdPageState extends State<ThirdPage> {
  TextEditingController _controller = TextEditingController();
  String inputValue = '';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('THIRD PAGE'),
      ),
      body: Column(
        children: [
          Expanded(
            child: Container(
              width: double.infinity,
              color: Colors.red,
              child: MaterialButton(
                onPressed: () {
                  setState(() {
                    inputValue = _controller.text;
                  });
                },
                child: Text(inputValue,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 25,
                    )),
              ),
            ),
          ),
          Expanded(
            flex: 6,
            child: ListView.builder(
              itemBuilder: (BuildContext context, int index) {
                return Container(
                  padding: const EdgeInsets.all(25),
                  color: Colors.blue,
                  child: TextFormField(
                    controller: _controller,
                  ),
                );
              },
              itemCount: 10,
            ),
          ),
        ],
      ),
    );
  }
}
