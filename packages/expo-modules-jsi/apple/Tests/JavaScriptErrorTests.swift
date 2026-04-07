// Copyright 2025-present 650 Industries. All rights reserved.

import Testing
import ExpoModulesJSI

@Suite
@JavaScriptActor
struct JavaScriptErrorTests {
  let runtime = JavaScriptRuntime()

  // MARK: - Basic error creation

  @Test
  func `creates error with message`() {
    let error = JavaScriptError(runtime, message: "Something went wrong")
    let value = error.asValue()

    #expect(value.isObject() == true)
    #expect(value.getObject().getProperty("message").getString() == "Something went wrong")
  }

  // MARK: - JavaScriptThrowable conversion

  @Test
  func `creates error from throwable with message only`() {
    let throwable = SimpleError(message: "Test error")
    let error = JavaScriptError(runtime, from: throwable)
    let object = error.asValue().getObject()

    #expect(object.getProperty("message").getString() == "Test error")
    #expect(object.getProperty("code").isUndefined() == true)
  }

  @Test
  func `creates error from throwable with code`() {
    let throwable = CodedError(message: "Not found", code: "ERR_NOT_FOUND")
    let error = JavaScriptError(runtime, from: throwable)
    let object = error.asValue().getObject()

    #expect(object.getProperty("message").getString() == "Not found")
    #expect(object.getProperty("code").getString() == "ERR_NOT_FOUND")
  }

  @Test
  func `throwable error can be caught in JavaScript`() throws {
    let fn = runtime.createFunction("failing") { _, _ in
      let throwable = CodedError(message: "Boom", code: "ERR_BOOM")
      throw throwable
    }
    runtime.global().setProperty("failing", value: fn)

    let result = try runtime.eval("""
      try { failing(); 'no error' } catch (e) { e.message }
    """)
    print(try result.jsonStringify())
    #expect(try result.asString() == "Boom")
  }
}

// MARK: - Test error types

private struct SimpleError: JavaScriptThrowable {
  var message: String
}

private struct CodedError: JavaScriptThrowable {
  var message: String
  var code: String?
}

