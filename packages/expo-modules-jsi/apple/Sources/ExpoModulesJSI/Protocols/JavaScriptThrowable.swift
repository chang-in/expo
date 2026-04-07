/**
 A protocol that native error types can conform to in order to control
 how they are represented when thrown into the JavaScript world.

 When a native function throws an error that conforms to this protocol,
 a JavaScript `Error` object is created with the specified `message`
 and `code`.

 Types that don't conform to this protocol are still throwable, but
 will use a generic error representation.

 ```swift
 struct MyError: JavaScriptThrowable {
   var message: String { "Something went wrong" }
   var code: String? { "ERR_MY_ERROR" }
 }
 ```
 */
public protocol JavaScriptThrowable: Error, Sendable {
  /**
   The error message describing what went wrong.
   */
  var message: String { get }

  /**
   An optional error code for programmatic error handling in JavaScript.
   */
  var code: String? { get }
}

extension JavaScriptThrowable {
  public var code: String? { nil }
}
