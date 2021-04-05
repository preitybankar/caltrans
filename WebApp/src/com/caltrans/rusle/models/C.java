package com.caltrans.rusle.models;

public class C {
	private final String bmpName;
	private final String reference;
	private final float cValue;

	public C(String bmpName, String reference, float cValue) {
		this.bmpName = bmpName;
		this.reference = reference;
		this.cValue = cValue;
	}

	public String getBMPName() {
		return bmpName;
	}

	public String getReference() {
		return reference;
	}

	public float getCValue() {
		return cValue;
	}
	
	@Override
	public String toString() {
		return String.format("BMP Name: %s, Reference: %s, C value: %f", bmpName, reference, cValue);
	}
}
